import { ResetPasswordFormValues } from '@/lib/schemas/auth.schema';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { resetPasswordAction } from '../_actions/reset-password.action';
import { toast } from 'sonner';

export default function useResetPassword() {
  // Navigation
  const router = useRouter();

  // Mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (fields: ResetPasswordFormValues & { email: string }) => {
      const payload = await resetPasswordAction(fields);

      if ('code' in payload) {
        throw new Error(payload.message || 'Failed to reset password');
      }

      return payload;
    },
    onSuccess: () => {
      toast.success('Your password has been reset!');

      router.push('/auth/sign-in');
    },
  });

  return { resetPassword: mutate, error, isPending };
}
