import { Button, Field, Form } from '@/primitives';
import { useStore } from '@/store';
import { useState } from 'react';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const AuthForm = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { supabase } = useStore.getState();

  return (
    <Form
      className="flex flex-col gap-4"
      errors={errors}
      onClearErrors={setErrors}
      onSubmit={async event => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const validate = authSchema.safeParse(Object.fromEntries(formData));

        if (!validate.success) {
          const formattedErrors = validate.error.format();
          const validationErrors = {
            email: formattedErrors.email?._errors[0],
            password: formattedErrors.password?._errors[0],
          };
          setErrors(validationErrors);
          return;
        }

        setLoading(true);
        const response = await supabase.auth.signInWithPassword({
          email: validate.data.email,
          password: validate.data.password,
        });
        if (response.error) {
          setErrors({
            email: response.error.message,
          });
        }
        setLoading(false);
      }}
    >
      <Field name="email">
        <Field.Control type="email" placeholder="Email" required />
        <Field.Error />
      </Field>
      <Field name="password">
        <Field.Control type="password" placeholder="Password" required />
        <Field.Error />
      </Field>
      <Button disabled={loading} type="submit">
        Login
      </Button>
    </Form>
  );
};
