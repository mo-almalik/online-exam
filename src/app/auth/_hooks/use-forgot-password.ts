import { ForgotPasswordFormValues } from '@/lib/schemas/auth.schema';
import { useMutation } from '@tanstack/react-query';
import { forgotPasswordAction } from '../_actions/auth.action';
import { toast } from 'sonner';

export default function useForgotPassword() {
  // Mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (fields: ForgotPasswordFormValues) => {
      const payload = await forgotPasswordAction(fields);

      if ('code' in payload) {
        throw new Error(payload.message || 'Failed to reset password');
      }

      return payload;
    },
    onSuccess: () => {
      toast.success('OTP code has been sent to your email');
    },
  });

  return { forgotPassword: mutate, isPending, error };
}
