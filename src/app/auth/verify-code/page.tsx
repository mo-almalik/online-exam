'use client';

import { JSON_HEADER } from '@/lib/constants/api.constants';
import { VerifyCodeFormValues, verifyCodeSchema } from '@/lib/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import useForgotPassword from '../_hooks/use-forgot-password';
import { useAuthContext } from '../_providers/auth.provider';
import { toast } from 'sonner';

export default function VerifyCode() {
  // Context
  const { email } = useAuthContext();

  const router = useRouter();
  const form = useForm<VerifyCodeFormValues>({
    defaultValues: {
      resetCode: '',
    },
    resolver: zodResolver(verifyCodeSchema),
    disabled: !email,
  });

  // Mutation
  const { forgotPassword: sendOTP, isPending: isSendingOTP } = useForgotPassword();
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: async (data: VerifyCodeFormValues) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_TEST_API}/auth/verifyResetCode`, {
        method: 'POST',
        headers: {
          ...JSON_HEADER,
        },
        body: JSON.stringify({
          resetCode: data.resetCode,
        }),
      });
      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.message || 'Failed to verify code');
      }
      console.log(res);
      console.log('payload', payload);
      return payload;
    },
    onSuccess: (payload) => {
      if (payload.status === 'Success') {
        // Redirect to reset password page after 3 seconds
        setTimeout(() => {
          router.push('/auth/reset-password');
        }, 500);
      }
    },
  });

  // submit virefy code
  const onSubmit = (data: VerifyCodeFormValues) => {
    mutate(data);
  };
  return (
    <div className='flex items-center justify-center w-3/4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
          <h2 className='text-2xl font-bold mb-7'>Verify code</h2>
          <FormField
            control={form.control}
            name='resetCode'
            render={({ field }) => (
              <FormItem>
                <FormControl className='py-6 bg-[#E0E0E9] rounded-sm shadow-lg shadow-[#F9F9F9]'>
                  <Input
                    placeholder='Enter Code'
                    {...field}
                    className='w-full focus:border-primary border border-primary text-gray-600 '
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* error message */}
          {error && <p className='text-red-500 text-sm'>{error.message}</p>}

          {/* success message */}
          {data && <p className='text-gray-500 text-sm'>{data.status}</p>}

          {/* No email feedback */}
          {!email && (
            <p className='text-red-600'>
              Please start the reset password flow from{' '}
              <Link href='/auth/forgot-password' className='underline'>
                the beginning.
              </Link>
            </p>
          )}

          {/* resnd code */}
          <p className='text-gray-600 text-sm'>
            Didn&apos;t receive the code?{' '}
            <Button
              type='button'
              className='p-0'
              variant='link'
              disabled={!email || isSendingOTP}
              onClick={() =>
                sendOTP(
                  { email: email! },
                  {
                    onError: (error) => toast.error(error.message),
                  },
                )
              }
            >
              Resend
            </Button>
          </p>

          <Button
            type='submit'
            className='py-6 w-full drop-shadow-[#2F1C1C1A] shadow-lg'
            disabled={!email || isPending}
          >
            {isPending ? 'Resetting...' : 'Verify'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
