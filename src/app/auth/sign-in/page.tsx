'use client'; // NEVER make route client side
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LoginFormValues, loginSchema } from '@/lib/schemas/auth.schema';
import useLogin from './_hooks/use-login';

export default function SignInPage() {
  // Mutation
  const { mutate } = useLogin();

  // Form
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  // Functions
  const onSubmit: SubmitHandler<LoginFormValues> = (values) => {
    mutate(values);
  };

  return (
    <div className='flex flex-col items-center justify-center w-3/4'>
      {/* Title */}
      <h2 className='text-2xl font-bold mb-7'>Sign in</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <FormLabel className='sr-only'>Email</FormLabel>

                {/* Field */}
                <FormControl className='py-6 bg-custom-gray-100 rounded-sm shadow-lg shadow-custom-gray-50'>
                  <Input
                    placeholder='Enter Email'
                    {...field}
                    className='w-full focus:border-primary  border border-gray-300   text-gray-600'
                  />
                </FormControl>

                {/* Message */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <FormLabel className='sr-only'>Password</FormLabel>

                {/* Field */}
                <FormControl className=' mb-0 py-6 bg-custom-gray-100  rounded-sm shadow-lg shadow-custom-gray-50'>
                  <Input
                    type='password'
                    placeholder='Enter password'
                    {...field}
                    className='w-full focus:border-primary  border border-gray-300 text-gray-600'
                  />
                </FormControl>

                {/* Message */}
                <FormMessage />

                {/* Forgot password */}
                <div className=' justify-between pt-4 text-right w-full'>
                  <Link href='/auth/forgot-password' className='text-sm text-primary'>
                    Forgot password?
                  </Link>
                </div>
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type='submit' className='py-6 w-full  drop-shadow-[#2F1C1C1A] shadow-lg'>
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
}
