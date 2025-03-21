import { Button } from '@/primitives';
import { useStore } from '@/store';
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type ShotsTabProps = {
  cityId: string | null;
};

export const ShotsTab = ({ cityId }: ShotsTabProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdatingCount, setIsUpdatingCount] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { supabase } = useStore();

  const destinationPath = `cities/${cityId}`;

  if (!cityId)
    return (
      <div className="flex w-full items-center justify-center rounded-xl bg-red-100 p-4 text-red-600">
        City ID missing
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
              body: JSON.stringify({ base64Data, destinationPath, fileIndex: i }),
            }
          );

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || 'Upload failed');
          }

          // Add URL to successful uploads
          uploadedUrls.push(result.url);
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

      // If uploads were successful, update the shot count
      if (uploadedUrls.length > 0) {
        updateShotCount();
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

  const updateShotCount = useCallback(async () => {
    if (!cityId) return;

    try {
      setIsUpdatingCount(true);

      // Get session token
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        console.error('Authentication required for updating shot count');
        return;
      }

      // Call the Supabase Edge Function to count images and update the city
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/bunny-count`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            folderPath: destinationPath,
            cityId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error('Failed to update shot count:', result.error);
      }
    } catch (err) {
      console.error('Error updating shot count:', err);
    } finally {
      setIsUpdatingCount(false);
    }
  }, [cityId, supabase, destinationPath]);

  // Update shot count when component mounts if we have a cityId
  useEffect(() => {
    if (cityId) {
      updateShotCount();
    }
  }, [cityId, updateShotCount]);

  return (
    <div className="mx-auto w-full rounded-xl border border-gray-200 p-4">
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
              {isUpdatingCount && (
                <div className="mt-1 text-sm">Updating shot count...</div>
              )}
            </div>

            <div className="flex gap-2">
              {uploadedImageUrls.map((url, index) => (
                <div key={url} className="rounded-md border p-3">
                  <p className="mb-2 text-sm font-medium">
                    Image {index + 1} URL:
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={url}
                      readOnly
                      className="flex-1 rounded-md border bg-gray-50 p-2 text-sm"
                    />
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => navigator.clipboard.writeText(url)}
                      className="rounded-md bg-gray-200 p-2 hover:bg-gray-300"
                    >
                      Copy
                    </Button>
                  </div>
                  <div className="mt-2">
                    <p className="mb-2 text-sm font-medium">Preview:</p>
                    <img
                      src={url}
                      alt={`Uploaded content ${index + 1}`}
                      className="h-auto max-h-64 max-w-full rounded-md border"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
