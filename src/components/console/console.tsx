import { Button, Dialog, Tabs } from '@/primitives';
import { useStore } from '@/store';
import { canShowConsole } from '@/utils';
import { PowerIcon } from 'lucide-react';
import { useState } from 'react';
import { AuthForm } from './subcomponents/auth-form';
import { NewCityFormExistingCreator } from './subcomponents/new-city-form-existing-creator';
import { NewCityFormNewCreator } from './subcomponents/new-city-form-new-creator';

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
      <Dialog onOpenChange={setIsShowingConsole} open={isShowingConsole}>
        <Dialog.Trigger
          render={() => (
            <Button
              variant="primary"
              type="button"
              onClick={() => setIsShowingConsole(true)}
            >
              Post new city
            </Button>
          )}
        />
        <Dialog.Popup>
          <Tabs>
            <Tabs.List>
              <Tabs.Tab value="new-creator">New creator</Tabs.Tab>
              <Tabs.Tab value="existing-creator">Existing creator</Tabs.Tab>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Panel value="new-creator">
              <NewCityFormNewCreator />
            </Tabs.Panel>
            <Tabs.Panel value="existing-creator">
              <NewCityFormExistingCreator />
            </Tabs.Panel>
          </Tabs>
        </Dialog.Popup>
      </Dialog>
      <Button
        type="button"
        onClick={() => useStore.getState().signOut()}
        iconOnly
      >
        <PowerIcon className="size-5" />
      </Button>
    </div>
  );
};
