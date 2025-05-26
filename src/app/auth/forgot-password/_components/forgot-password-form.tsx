'use client';

import { ForgotPasswordFormValues, forgotPasswordSchema } from '@/lib/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useForgotPassword from '../../_hooks/use-forgot-password';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../_providers/auth.provider';

export default function ForgotPasswordForm() {
  // Navigation
  const router = useRouter();

  // Context
  const { setEmail } = useAuthContext();

  // Form
  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  // Mutation
  const { forgotPassword, isPending, error } = useForgotPassword();

  // Functions
  const onSubmit = (data: ForgotPasswordFormValues) => {
    forgotPassword(data, {
      onSuccess: () => {
        // Store the email in the context to be next steps
        setEmail(data.email);

        // Redirect to verify email page after 500 ms
        router.push('/auth/verify-code');
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
        {/* Title */}
        <h2 className='text-2xl font-bold mb-7'>Forgot your password?</h2>

        {/* Email */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl className='py-6 bg-[#E0E0E9] rounded-sm shadow-lg shadow-[#F9F9F9]'>
                <Input
                  placeholder='Enter Email'
                  {...field}
                  className='w-full focus:border-primary border border-primary text-gray-600 '
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error message */}
        {error && <p className='text-red-500 text-sm'>{error.message}</p>}

        {/* Submit */}
        <Button
          type='submit'
          className='py-6 w-full drop-shadow-[#2F1C1C1A] shadow-lg'
          disabled={isPending}
        >
          {isPending ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </Form>
  );
}
