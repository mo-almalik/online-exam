'use client';

import { ResetPasswordFormValues, resetPasswordSchema } from '@/lib/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useResetPassword from '../_hooks/use-reset-password';
import { useAuthContext } from '../../_providers/auth.provider';
import Link from 'next/link';

export default function ResetPasswordForm() {
  // Context
  const { email } = useAuthContext();

  // Form
  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {
      newPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema),
    disabled: !email,
  });

  // Mutation
  const { resetPassword, isPending } = useResetPassword();

  // Functions
  const onSubmit: SubmitHandler<ResetPasswordFormValues> = (values) => {
    resetPassword({ ...values, email: email! });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
        {/* Title */}
        <h2 className='text-2xl font-bold mb-7'>Set a Password</h2>

        {/* New Password */}
        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel className='sr-only'>New Password</FormLabel>

              {/* Field */}
              <FormControl className='py-6 bg-[#E0E0E9] rounded-sm shadow-lg shadow-[#F9F9F9]'>
                <Input
                  type='password'
                  placeholder='Enter New Password'
                  {...field}
                  className='w-full focus:border-primary border border-primary text-gray-600 '
                />
              </FormControl>

              {/* Message */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* No email feedback */}
        {!email && (
          <p className='text-red-600'>
            Please start the reset password flow from{' '}
            <Link href='/auth/forgot-password' className='underline'>
              the beginning.
            </Link>
          </p>
        )}

        {/* Submit */}
        <Button
          type='submit'
          className='py-6 w-full drop-shadow-[#2F1C1C1A] shadow-lg'
          disabled={isPending || !email}
        >
          {isPending ? 'Resetting...' : ' Confirm'}
        </Button>
      </form>
    </Form>
  );
}
