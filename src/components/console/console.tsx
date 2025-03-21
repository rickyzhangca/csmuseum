import { Button, Dialog } from '@/primitives';
import { useStore } from '@/store';
import { canShowConsole } from '@/utils';
import { PowerIcon } from 'lucide-react';
import { useState } from 'react';
import { AuthForm } from './subcomponents/auth-form';
import { NewCityForm } from './subcomponents/new-city-form/new-city-form';

export const Console = () => {
  const [isShowingConsole, setIsShowingConsole] = useState(false);
  const { user } = useStore();

  if (!canShowConsole()) return null;

  if (!user) {
    return (
      <Dialog>
        <Dialog.Trigger>Sign in</Dialog.Trigger>
        <Dialog.Popup>
          <AuthForm />
        </Dialog.Popup>
      </Dialog>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Dialog onOpenChange={undefined} open={isShowingConsole}>
        <Dialog.Trigger
          render={() => (
            <Button type="button" onClick={() => setIsShowingConsole(true)}>
              Post new city
            </Button>
          )}
        />
        <Dialog.Popup className="flex flex-col gap-2">
          <NewCityForm />
          <Button
            type="button"
            variant="destructive"
            onClick={() => setIsShowingConsole(false)}
          >
            Cancel
          </Button>
        </Dialog.Popup>
      </Dialog>
      <Button
        type="button"
        variant="secondary"
        onClick={() => useStore.getState().signOut()}
        iconOnly
      >
        <PowerIcon className="size-5" />
      </Button>
    </div>
  );
};
