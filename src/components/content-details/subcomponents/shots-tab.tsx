import { Button } from '@/primitives';
import { useStore } from '@/store';
import type { Content, ContentType } from '@/types';
import { invalidateContentQueries } from '@/utils';
import { type ChangeEvent, useRef, useState } from 'react';

type ShotsTabProps = {
  contentType: ContentType;
  content: Content;
};

export const ShotsTab = ({ contentType, content }: ShotsTabProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { supabase } = useStore();

  const destinationPath = `${contentType}/${content.id}`;

  if (!content.id || !contentType)
    return (
      <div className="flex w-full items-center justify-center rounded-xl bg-red-100 p-4 text-red-600">
        City ID or new content type missing
      </div>
    );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Reset states
    setError(null);
    setSelectedFiles([]);

    // Validate files
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate each file
    const invalidTypeFiles = files.filter(
      file => !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
    );

    if (invalidTypeFiles.length > 0) {
      setError('Only JPEG, PNG, and WebP images are allowed');
      return;
    }

    // Check file sizes (10MB max each)
    const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError('One or more files exceed the 10MB size limit');
      return;
    }

    setSelectedFiles(files);
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleUpload = async () => {
    try {
      // Reset states
      setError(null);
      setUploadedImageUrls([]);
      setIsUploading(true);

      if (selectedFiles.length === 0) {
        setError('Please select at least one image to upload');
        return;
      }

      // Get session token
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        setError('Authentication required. Please sign in.');
        return;
      }

      const uploadedUrls: string[] = [];
      const failedUploads: string[] = [];

      // Upload each file
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        try {
          // Convert file to base64
          const base64Data = await convertToBase64(file);

          // Call the Supabase Edge Function
          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/bunny`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                base64Data,
                destinationPath,
              }),
            }
          );

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || 'Upload failed');
          }

          // Get the URL from the result (should be an array now with our new UUID-based approach)
          const url = Array.isArray(result.url) ? result.url[0] : result.url;

          // Add URL to successful uploads
          uploadedUrls.push(url);
        } catch (error) {
          failedUploads.push(file.name);
          console.error(`Error uploading ${file.name}:`, error);
        }
      }

      // Update state with successful uploads
      setUploadedImageUrls(uploadedUrls);

      // Show error if any uploads failed
      if (failedUploads.length > 0) {
        setError(`Failed to upload: ${failedUploads.join(', ')}`);
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
        setSelectedFiles([]);
      }
      if (uploadedUrls.length > 0) {
        await saveImageIdsToSupabase(uploadedUrls);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  // Extract image ID from URL
  const extractImageIdFromUrl = (url: string): string => {
    // URL format: https://storage-zone.b-cdn.net/content-type/id/short-uuid.ext
    const urlParts = url.split('/');
    const filename = urlParts[urlParts.length - 1]; // Get the filename
    const imageId = filename.split('.')[0]; // Remove the extension
    return imageId;
  };

  // Save image IDs to the appropriate Supabase table
  const saveImageIdsToSupabase = async (urls: string[]) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      if (!userId) {
        console.error('User ID not found');
        return;
      }

      // Determine which table to use based on content type
      const tableName = `${contentType}_images`;

      // Prepare image data for insertion
      const imageData = urls.map(url => ({
        content_id: content.id,
        id: extractImageIdFromUrl(url),
        posted_by_id: userId,
      }));

      // Insert image metadata into Supabase
      const { error } = await supabase.from(tableName).insert(imageData);

      if (error) {
        console.error('Error saving image IDs to Supabase:', error);
      } else {
        // invalidate the corresponding query based on content type
        if (content.id) invalidateContentQueries(contentType, content.id);
      }
    } catch (error) {
      console.error('Error in saveImageIdsToSupabase:', error);
    }
  };

  return (
    <div className="mx-auto w-full rounded-2xl border-gray-200 bg-white p-4">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <input
            id="image-upload"
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="rounded-md border border-gray-200 bg-white p-2"
            disabled={isUploading}
            multiple
          />
        </div>

        <Button
          type="button"
          onClick={handleUpload}
          disabled={
            isUploading || selectedFiles.length === 0 || !destinationPath
          }
          className="w-full"
          variant="admin"
        >
          {isUploading
            ? 'Uploading...'
            : `Upload ${selectedFiles.length} image(s)`}
        </Button>

        {error && (
          <div className="rounded-md border border-red-300 bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        {uploadedImageUrls.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="rounded-md border border-green-300 bg-green-100 p-3 text-green-700">
              {uploadedImageUrls.length === 1
                ? 'Image uploaded successfully!'
                : `${uploadedImageUrls.length} images uploaded successfully!`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
