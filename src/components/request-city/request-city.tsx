import { Button, Dialog } from '@/primitives';
import { useState } from 'react';

export const RequestCity = () => {
  const [isShowingRequest, setIsShowingRequest] = useState(false);

  return (
    <Dialog onOpenChange={undefined} open={isShowingRequest}>
      <Dialog.Trigger
        render={() => (
          <Button type="button" onClick={() => setIsShowingRequest(true)}>
            Add a city
          </Button>
        )}
      />
      <Dialog.Popup className="flex flex-col gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setIsShowingRequest(false)}
        >
          Done
        </Button>
      </Dialog.Popup>
    </Dialog>
  );
};
