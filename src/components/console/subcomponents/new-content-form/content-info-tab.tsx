import { Button, Field, Form, Radio, RadioGroup } from '@/primitives';
import { useStore } from '@/store';
import { CONTENT_TYPES, type ContentType } from '@/types';
import { useState } from 'react';
import { z } from 'zod';

const newCitySchema = z.object({
  type: z.enum(CONTENT_TYPES),
  id: z.string(),
  name: z.string(),
  outline: z.string(),
});

type ContentInfoTabProps = {
  onComplete: (cityId: string, contentType: ContentType) => void;
};

export const ContentInfoTab = ({ onComplete }: ContentInfoTabProps) => {
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

        const createContent = await supabase.from(validate.data.type).insert({
          id: validate.data.id,
          name: validate.data.name,
          outline: validate.data.outline,
          created_by_id: user.id,
        });

        if (createContent.error) {
          setErrors({
            id: createContent.error.message,
          });
          setLoading(false);
          return;
        }
        setLoading(false);
        onComplete(validate.data.id, validate.data.type);
      }}
    >
      <Field>
        <div className="flex flex-col gap-2 rounded-xl border border-gray-200 px-4 py-3">
          Content type
          <RadioGroup
            name="type"
            className="flex-row gap-4"
            defaultValue="city"
          >
            <p className="flex items-center gap-2">
              <Radio value="city">
                <Radio.Indicator />
              </Radio>
              City
            </p>
            <p className="flex items-center gap-2">
              <Radio value="shots">
                <Radio.Indicator />
              </Radio>
              Shots
            </p>
            <p className="flex items-center gap-2">
              <Radio value="asset">
                <Radio.Indicator />
              </Radio>
              Asset
            </p>
          </RadioGroup>
        </div>
        <Field.Error />
      </Field>
      <Field name="id">
        <Field.Control type="text" placeholder="Content ID" required />
        <Field.Error />
      </Field>
      <Field name="name">
        <Field.Control type="text" placeholder="Content name" required />
        <Field.Error />
      </Field>
      <Field name="outline">
        <Field.Control type="text" placeholder="Content outline" required />
        <Field.Error />
      </Field>

      <Button disabled={loading} type="submit">
        Create content
      </Button>
    </Form>
  );
};
