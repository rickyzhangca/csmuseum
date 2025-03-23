import { Button, Dialog, Field, Form } from '@/primitives';
import { useStore } from '@/store';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const requestSchema = z.object({
  content: z.string().nonempty(),
  url: z.string().url(),
});

export const RequestCity = () => {
  const [isShowingRequest, setIsShowingRequest] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { supabase } = useStore.getState();

  useEffect(() => {
    if (!isShowingRequest) {
      setErrors({});
      setLoading(false);
    }
  }, [isShowingRequest]);

  return (
    <Dialog onOpenChange={setIsShowingRequest} open={isShowingRequest}>
      <Dialog.Trigger
        render={() => (
          <Button type="button" onClick={() => setIsShowingRequest(true)}>
            Add a content
          </Button>
        )}
      />
      <Dialog.Popup className="flex w-96 flex-col gap-2">
        <Dialog.Title>Request to add a content</Dialog.Title>
        <Dialog.Description>
          Shoot us the city/shot/asset you found. CSMuseum will add it to the
          collection as soon as possible.
        </Dialog.Description>
        <Form
          errors={errors}
          onClearErrors={setErrors}
          className="flex flex-col gap-4 pt-4"
          onSubmit={async event => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            const validate = requestSchema.safeParse(
              Object.fromEntries(formData)
            );

            if (!validate.success) {
              const formattedErrors = validate.error.format();
              const validationErrors = {
                content: formattedErrors.content?._errors[0],
                url: formattedErrors.url?._errors[0],
              };
              setErrors(validationErrors);
              return;
            }

            setLoading(true);
            const response = await supabase.from('requests').insert({
              content: validate.data.content,
              url: validate.data.url,
            });
            if (response.error) {
              setErrors({
                content: response.error.message,
              });
            }

            toast.custom(() => (
              <div className="z-50 rounded-full bg-gray-900 px-6 py-4 font-medium text-white">
                Request sent, thank you!
              </div>
            ));

            setIsShowingRequest(false);
            setLoading(false);
          }}
        >
          <div className="flex flex-col gap-2">
            <Field name="content">
              <Field.Control placeholder="What's this about?" />
              <Field.Error />
            </Field>
            <Field name="url">
              <Field.Control placeholder="Link to source" />
              <Field.Error />
            </Field>
          </div>
          <Button type="submit" disabled={loading}>
            Send
          </Button>
        </Form>
      </Dialog.Popup>
    </Dialog>
  );
};
