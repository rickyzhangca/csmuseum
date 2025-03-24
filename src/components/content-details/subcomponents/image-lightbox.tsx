import { Dialog } from '@/primitives';

interface ImageLightboxProps {
  imageUrl: string;
  alt: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ImageLightbox = ({
  imageUrl,
  alt,
  open,
  onOpenChange,
}: ImageLightboxProps) => {
  // keyboard navigation for escape key
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Popup
        darkerBackdrop
        className="max-h-[calc(100vh-48px)] max-w-[calc(100vw-48px)] border border-black bg-black p-0 shadow-2xl"
        onKeyDown={handleKeyDown}
        onClick={() => onOpenChange(false)}
      >
        <img
          src={imageUrl}
          alt={alt}
          className="max-h-[80vh] max-w-full object-contain"
        />
      </Dialog.Popup>
    </Dialog>
  );
};
