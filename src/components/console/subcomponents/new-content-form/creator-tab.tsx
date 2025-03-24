import { Button, Field, Form, Radio, RadioGroup, Select } from '@/primitives';
import { useStore } from '@/store';
import type { ContentType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { z } from 'zod';

const newCreatorSchema = z.object({
  'creator-id': z.string(),
  'creator-name': z.string(),
  'creator-profile-url': z.string().optional(),
  'creator-profile-url-type': z
    .enum(['youtube', 'twitter', 'xiaohongshu'])
    .optional(),
});

type NewCreatorFormProps = {
  cityId: string;
  newContentType: ContentType;
  onComplete: () => void;
};

const NewCreatorForm = ({
  cityId,
  newContentType,
  onComplete,
}: NewCreatorFormProps) => {
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
            'creator-id': formattedErrors['creator-id']?._errors[0],
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
            id: validate.data['creator-id'],
            name: validate.data['creator-name'],
            profile_url: validate.data['creator-profile-url'],
            profile_url_type: validate.data['creator-profile-url-type'],
            posted_by_id: user.id,
          })
          .select();
        if (createCreator.error) {
          setErrors({
            'creator-id': createCreator.error.message,
          });
          setLoading(false);
          return;
        }

        const updateContent = await supabase
          .from(newContentType)
          .update({
            creator_id: createCreator.data[0].id,
          })
          .eq('id', cityId);
        if (updateContent.error) {
          setErrors({
            'creator-id': updateContent.error.message,
          });
          setLoading(false);
          return;
        }

        setLoading(false);
        onComplete();
      }}
    >
      <Field name="creator-id">
        <Field.Control type="text" placeholder="Creator ID" required />
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
      <Button disabled={loading} type="submit">
        Create creator
      </Button>
    </Form>
  );
};

const existingCreatorSchema = z.object({
  'creator-id': z.string(),
});

type ExistingCreatorFormProps = {
  cityId: string;
  newContentType: ContentType;
  onComplete: () => void;
};

const ExistingCreatorForm = ({
  cityId,
  newContentType,
  onComplete,
}: ExistingCreatorFormProps) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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

  if (!getCreators.data) return null;

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
            'creator-id': formattedErrors['creator-id']?._errors[0],
          };
          setErrors(validationErrors);
          setLoading(false);
          return;
        }

        const updateContent = await supabase
          .from(newContentType)
          .update({
            creator_id: validate.data['creator-id'],
          })
          .eq('id', cityId);
        if (updateContent.error) {
          setErrors({
            'creator-id': updateContent.error.message,
          });
          setLoading(false);
          return;
        }

        setLoading(false);
        onComplete();
      }}
    >
      <Field>
        <Select name="creator-id">
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
      <Button disabled={loading} type="submit">
        Use this creator
      </Button>
    </Form>
  );
};

type CreatorTabProps = {
  cityId: string | null;
  newContentType: ContentType | null;
  onComplete: () => void;
};

export const CreatorTab = ({
  cityId,
  newContentType,
  onComplete,
}: CreatorTabProps) => {
  const [selectedCreator, setSelectedCreator] = useState<'new' | 'existing'>(
    'new'
  );

  if (!cityId || !newContentType)
    return (
      <div className="flex w-full items-center justify-center rounded-xl bg-red-100 p-4 text-red-600">
        City ID or new content type missing
      </div>
    );

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        Created by
        <RadioGroup
          value={selectedCreator}
          onValueChange={value =>
            setSelectedCreator(value as 'new' | 'existing')
          }
          className="flex flex-row items-center gap-2"
        >
          <div className="flex items-center gap-2">
            <Radio value="new">
              <Radio.Indicator />
            </Radio>
            New
          </div>
          <div className="flex items-center gap-2">
            <Radio value="existing">
              <Radio.Indicator />
            </Radio>
            Existing
          </div>
        </RadioGroup>
      </div>
      {selectedCreator === 'new' ? (
        <NewCreatorForm
          cityId={cityId}
          newContentType={newContentType}
          onComplete={onComplete}
        />
      ) : (
        <ExistingCreatorForm
          cityId={cityId}
          newContentType={newContentType}
          onComplete={onComplete}
        />
      )}
    </div>
  );
};
