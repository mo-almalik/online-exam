import { LoginFormValues } from '@/lib/schemas/auth.schema';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

export default function useLogin() {
  const { data, error, isPending, mutate } = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const response = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (response?.error) throw new Error(response.error);

      return response;
    },
    onSuccess: () => {
      toast.success('Login successful');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { data, error, isPending, mutate };
}
