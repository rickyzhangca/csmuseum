import { Button, Field, Form, Radio, RadioGroup, Select } from '@/primitives';
import { useStore } from '@/store';
import {
  CONTENT_TYPES,
  type Content,
  type ContentType,
  URL_TYPE,
} from '@/types';
import { sanitizeXiaohongshuUrl } from '@/utils';
import { useEffect, useState } from 'react';
import { z } from 'zod';

const computeId = (name: string) =>
  name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

const newCitySchema = z.object({
  type: z.enum(CONTENT_TYPES),
  name: z.string(),
  outline: z.string(),
  source_url: z.string().url().optional(),
  source_url_type: z.enum(URL_TYPE).optional(),
});

type ContentInfoTabProps = {
  content: Content;
  contentType: ContentType;
};

export const ContentInfoTab = ({
  content,
  contentType,
}: ContentInfoTabProps) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { supabase, user } = useStore.getState();

  const [nameInput, setNameInput] = useState('');
  const [computedId, setComputedId] = useState('');

  useEffect(() => {
    setComputedId(computeId(nameInput));
  }, [nameInput]);

  if (!user) return;

  return (
    <Form
      className="flex w-full flex-col gap-4 rounded-2xl bg-white p-4"
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
            name: formattedErrors.name?._errors[0],
            outline: formattedErrors.outline?._errors[0],
            source_url: formattedErrors.source_url?._errors[0],
            source_url_type: formattedErrors.source_url_type?._errors[0],
          };
          setErrors(validationErrors);
          setLoading(false);
          return;
        }

        if (
          validate.data.source_url_type === 'xiaohongshu' &&
          validate.data.source_url
        ) {
          validate.data.source_url = sanitizeXiaohongshuUrl(
            validate.data.source_url
          );
        }

        const createContent = await supabase.from(contentType).insert({
          id: computedId,
          name: validate.data.name,
          outline: validate.data.outline,
          source_url: validate.data.source_url,
          source_url_type: validate.data.source_url_type,
          posted_by_id: user.id,
        });

        if (createContent.error) {
          setErrors({
            name: createContent.error.message,
          });
          setLoading(false);
          return;
        }
        setLoading(false);
      }}
    >
      <Field>
        <div className="flex flex-col gap-2 rounded-xl border border-gray-200 px-4 py-3">
          Content type
          <RadioGroup
            name="type"
            className="flex-row gap-4"
            defaultValue="cities"
          >
            <p className="flex items-center gap-2">
              <Radio value="cities">
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
              <Radio value="assets">
                <Radio.Indicator />
              </Radio>
              Asset
            </p>
          </RadioGroup>
        </div>
        <Field.Error />
      </Field>
      <Field name="name">
        <Field.Control
          type="text"
          placeholder="Content name"
          required
          onChange={e => setNameInput(e.target.value)}
        />
        <Field.Error />
      </Field>
      <div className="flex flex-col rounded-xl border border-gray-200 bg-gray-100 px-4 py-2">
        <p className="text-sm text-gray-400">Computed ID</p>
        <p>{computedId}</p>
      </div>
      <Field name="outline">
        <Field.Control type="text" placeholder="Content outline" required />
        <Field.Error />
      </Field>
      <Field name="source_url">
        <Field.Control type="text" placeholder="Source URL" />
        <Field.Error />
      </Field>
      <Field>
        <Select name="source_url_type" defaultValue="youtube">
          <Select.Trigger>
            <Select.Value />
            <Select.Icon />
          </Select.Trigger>
          <Select.Popup>
            {URL_TYPE.map(type => (
              <Select.Item key={type} value={type}>
                {type}
              </Select.Item>
            ))}
          </Select.Popup>
        </Select>
        <Field.Error />
      </Field>

      <Button disabled={loading} type="submit" variant="admin">
        Create content
      </Button>
    </Form>
  );
};
