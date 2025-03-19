import { useStore } from '@/store';
import { tw } from '@/utils';
import { type ChangeEvent, useRef, useState } from 'react';

export const BunnyForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { supabase } = useStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Reset states
    setError(null);
    setUploadedImageUrl(null);

    // Validate file
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Only JPEG, PNG, and WebP images are allowed');
      return;
    }

    // Check file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }
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
      setUploadedImageUrl(null);
      setIsUploading(true);

      const file = fileInputRef.current?.files?.[0];
      if (!file) {
        setError('Please select an image to upload');
        return;
      }

      // Get session token
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        setError('Authentication required. Please sign in.');
        return;
      }

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
          body: JSON.stringify({ base64Data }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      // Success
      setUploadedImageUrl(result.url);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
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

  return (
    <div className={tw('mx-auto w-full max-w-md space-y-4 p-4')}>
      <h2 className={tw('text-xl font-bold')}>Upload Image to Bunny CDN</h2>

      <div className={tw('space-y-4')}>
        <div className={tw('flex flex-col gap-2')}>
          <label htmlFor="image-upload" className={tw('text-sm font-medium')}>
            Select Image (JPEG, PNG, WebP - Max 10MB)
          </label>
          <input
            id="image-upload"
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className={tw('rounded-md border border-gray-300 p-2')}
            disabled={isUploading}
          />
        </div>

        <button
          type="button"
          onClick={handleUpload}
          disabled={isUploading}
          className={tw(
            'w-full rounded-md px-4 py-2 font-medium',
            'bg-blue-600 text-white hover:bg-blue-700',
            'disabled:cursor-not-allowed disabled:bg-blue-400',
            'transition-colors duration-200'
          )}
        >
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>

        {error && (
          <div
            className={tw(
              'rounded-md border border-red-300 bg-red-100 p-3 text-red-700'
            )}
          >
            {error}
          </div>
        )}

        {uploadedImageUrl && (
          <div className={tw('space-y-3')}>
            <div
              className={tw(
                'rounded-md border border-green-300 bg-green-100 p-3 text-green-700'
              )}
            >
              Image uploaded successfully!
            </div>

            <div className={tw('rounded-md border p-3')}>
              <p className={tw('mb-2 text-sm font-medium')}>Image URL:</p>
              <div className={tw('flex items-center gap-2')}>
                <input
                  type="text"
                  value={uploadedImageUrl}
                  readOnly
                  className={tw(
                    'flex-1 rounded-md border bg-gray-50 p-2 text-sm'
                  )}
                />
                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(uploadedImageUrl)
                  }
                  className={tw('rounded-md bg-gray-200 p-2 hover:bg-gray-300')}
                >
                  Copy
                </button>
              </div>
            </div>

            <div>
              <p className={tw('mb-2 text-sm font-medium')}>Preview:</p>
              <img
                src={uploadedImageUrl}
                alt="Your uploaded content"
                className={tw('h-auto max-h-64 max-w-full rounded-md border')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
