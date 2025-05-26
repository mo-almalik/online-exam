'use server';

import { JSON_HEADER } from '@/lib/constants/api.constants';
import { ResetPasswordFormValues } from '@/lib/schemas/auth.schema';

export async function resetPasswordAction(fields: ResetPasswordFormValues & { email: string }) {
  const res = await fetch(`${process.env.API}/auth/resetPassword`, {
    method: 'PUT',
    headers: {
      ...JSON_HEADER,
    },
    body: JSON.stringify(fields),
  });

  const payload = await res.json();

  return payload;
}
