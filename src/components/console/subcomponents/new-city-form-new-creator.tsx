import { Button, Field, Form, Select } from '@/primitives';
import { useStore } from '@/store';
import { useState } from 'react';
import { z } from 'zod';
import { BunnyForm } from './bunny-form';

const newCreatorSchema = z.object({
  name: z.string(),
  outline: z.string(),
  'creator-name': z.string(),
  'creator-profile-url': z.string().optional(),
  'creator-profile-url-type': z
    .enum(['youtube', 'twitter', 'xiaohongshu'])
    .optional(),
});

export const NewCityFormNewCreator = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { supabase, user } = useStore.getState();

  if (!user) return;

  return (
    <Form
      className="flex w-full flex-col gap-4"
      errors={errors}
      onClearErrors={setErrors}
      onSubmit={async event => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);

        const validate = newCreatorSchema.safeParse(
          Object.fromEntries(formData)
        );

        if (!validate.success) {
          const formattedErrors = validate.error.format();
          const validationErrors = {
            name: formattedErrors.name?._errors[0],
            outline: formattedErrors.outline?._errors[0],
            'creator-name': formattedErrors['creator-name']?._errors[0],
            'creator-profile-url':
              formattedErrors['creator-profile-url']?._errors[0],
            'creator-profile-url-type':
              formattedErrors['creator-profile-url-type']?._errors[0],
          };
          setErrors(validationErrors);
          setLoading(false);
          return;
        }

        const createCreator = await supabase
          .from('creators')
          .insert({
            name: validate.data['creator-name'],
            profile_url: validate.data['creator-profile-url'],
            profile_url_type: validate.data['creator-profile-url-type'],
            created_by_id: user.id,
          })
          .select();
        if (createCreator.error) {
          setErrors({
            'creator-name': createCreator.error.message,
          });
          setLoading(false);
          return;
        }

        const createCity = await supabase.from('cities').insert({
          name: validate.data.name,
          outline: validate.data.outline,
          creator: createCreator.data[0].id,
          created_by_id: user.id,
        });
        if (createCity.error) {
          setErrors({
            name: createCity.error.message,
          });
          setLoading(false);
          return;
        }

        setLoading(false);
      }}
    >
      <Field name="name">
        <Field.Control type="text" placeholder="City name" required />
        <Field.Error />
      </Field>
      <Field name="outline">
        <Field.Control type="text" placeholder="City outline" required />
        <Field.Error />
      </Field>

      <Field name="creator-name">
        <Field.Control type="text" placeholder="Creator name" required />
        <Field.Error />
      </Field>
      <Field name="creator-profile-url">
        <Field.Control type="text" placeholder="Creator profile URL" />
        <Field.Error />
      </Field>
      <Field>
        <Select name="creator-profile-url-type" defaultValue="youtube">
          <Select.Trigger>
            <Select.Value />
            <Select.Icon />
          </Select.Trigger>
          <Select.Popup>
            <Select.Item value="youtube">YouTube</Select.Item>
            <Select.Item value="twitter">Twitter</Select.Item>
            <Select.Item value="xiaohongshu">Xiaohongshu</Select.Item>
          </Select.Popup>
        </Select>
      </Field>

      <BunnyForm />

      <Button disabled={loading} type="submit">
        Post city
      </Button>
    </Form>
  );
};
