import { Button, Field, Form } from '@/primitives';
import { useStore } from '@/store';
import { useState } from 'react';
import { z } from 'zod';

const newCitySchema = z.object({
  id: z.string(),
  name: z.string(),
  outline: z.string(),
});

type CityInfoTabProps = {
  onComplete: (cityId: string) => void;
};

export const CityInfoTab = ({ onComplete }: CityInfoTabProps) => {
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

        const validate = newCitySchema.safeParse(Object.fromEntries(formData));

        if (!validate.success) {
          const formattedErrors = validate.error.format();
          const validationErrors = {
            id: formattedErrors.id?._errors[0],
            name: formattedErrors.name?._errors[0],
            outline: formattedErrors.outline?._errors[0],
          };
          setErrors(validationErrors);
          setLoading(false);
          return;
        }

        const createCity = await supabase.from('cities').insert({
          id: validate.data.id,
          name: validate.data.name,
          outline: validate.data.outline,
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
        onComplete(validate.data.id);
      }}
    >
      <Field name="id">
        <Field.Control type="text" placeholder="City ID" required />
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

      <Button disabled={loading} type="submit">
        Create city
      </Button>
    </Form>
  );
};
