'use server';

import { JSON_HEADER } from '@/lib/constants/api.constants';
import { ForgotPasswordFormValues } from '@/lib/schemas/auth.schema';

export async function forgotPasswordAction(fields: ForgotPasswordFormValues) {
  const res = await fetch(`${process.env.API}/auth/forgotPassword`, {
    method: 'POST',
    headers: {
      ...JSON_HEADER,
    },
    body: JSON.stringify({
      email: fields.email,
    }),
  });

  const payload: APIResponse<null> = await res.json();

  return payload;
}
