import { Button, Field, Form, Select } from '@/primitives';
import { useStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { z } from 'zod';
import { BunnyForm } from './bunny-form';

const existingCreatorSchema = z.object({
  id: z.string(),
  name: z.string(),
  outline: z.string(),
  'created-by-id': z.string(),
});

export const NewCityFormExistingCreator = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cityId, setCityId] = useState('');
  const destinationPath = cityId ? `test/${cityId}` : '';
  const { supabase, user } = useStore.getState();

  if (!user) return;

  const getCreators = useQuery({
    queryKey: ['creators'],
    queryFn: async () => {
      const { data, error } = await supabase.from('creators').select('*');
      if (error) throw error;
      return data;
    },
  });

  return (
    <Form
      className="flex w-full flex-col gap-4"
      errors={errors}
      onClearErrors={setErrors}
      onSubmit={async event => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);

        const validate = existingCreatorSchema.safeParse(
          Object.fromEntries(formData)
        );

        if (!validate.success) {
          const formattedErrors = validate.error.format();
          const validationErrors = {
            id: formattedErrors.id?._errors[0],
            name: formattedErrors.name?._errors[0],
            outline: formattedErrors.outline?._errors[0],
            'created-by-id': formattedErrors['created-by-id']?._errors[0],
          };
          setErrors(validationErrors);
          setLoading(false);
          return;
        }

        const createCity = await supabase.from('cities').insert({
          id: validate.data.id,
          name: validate.data.name,
          outline: validate.data.outline,
          creator: validate.data['created-by-id'],
          created_by_id: user.id,
        });
        if (createCity.error) {
          setErrors({
            id: createCity.error.message,
          });
          setLoading(false);
          return;
        }

        setLoading(false);
      }}
    >
      <Field name="id">
        <Field.Control
          type="text"
          placeholder="City ID"
          required
          onChange={e => setCityId(e.target.value)}
        />
        <Field.Error />
      </Field>
      <Field name="name">
        <Field.Control type="text" placeholder="City name" required />
        <Field.Error />
      </Field>
      <Field name="outline">
        <Field.Control type="text" placeholder="City outline" required />
        <Field.Error />
      </Field>

      <Field>
        <Select name="created-by-id">
          <Select.Trigger>
            <Select.Value />
            <Select.Icon />
          </Select.Trigger>
          <Select.Popup>
            {getCreators.data?.map(creator => (
              <Select.Item key={creator.id} value={creator.id}>
                {creator.name}
              </Select.Item>
            ))}
          </Select.Popup>
        </Select>
      </Field>

      <BunnyForm destinationPath={destinationPath} />

      <Button disabled={loading} type="submit">
        Post city
      </Button>
    </Form>
  );
};
