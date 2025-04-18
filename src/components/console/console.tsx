import { Button, Dialog } from '@/primitives';
import { useStore } from '@/store';
import { canShowConsole } from '@/utils';
import { Power } from '@phosphor-icons/react';
import { useState } from 'react';
import { AuthForm } from './subcomponents/auth-form';
import { NewContentForm } from './subcomponents/new-content-form/new-content-form';

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
            <Button
              type="button"
              variant="admin"
              onClick={() => setIsShowingConsole(true)}
            >
              Add a content
            </Button>
          )}
        />
        <Dialog.Popup className="flex flex-col gap-2">
          <NewContentForm />
          <Button
            type="button"
            variant="destructive"
            onClick={() => setIsShowingConsole(false)}
          >
            Quit
          </Button>
        </Dialog.Popup>
      </Dialog>
      <Button
        type="button"
        variant="destructive"
        onClick={() => useStore.getState().signOut()}
        iconOnly
      >
        <Power size={20} weight="bold" />
      </Button>
    </div>
  );
};
