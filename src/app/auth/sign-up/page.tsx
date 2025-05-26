'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { SignupFormValues, signupSchema } from '@/lib/schemas/auth.schema';
import UseSignUp from './_hooks/use-sign-up';

export default function SignUpPage() {
  const { signUp, error, isPending } = UseSignUp();
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      username: '',
      phone: '',
      rePassword: '',
    },
  });

  const onSubmit = async (value: SignupFormValues) => {
    signUp(value);
  };

  return (
    <div className='flex items-center justify-center w-3/4'>
      <h2 className='text-2xl font-bold mb-7'>Sign Up</h2>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl className='py-6 bg-[#E0E0E9] rounded-sm shadow-lg shadow-[#F9F9F9]'>
                    <Input
                      placeholder='Enter Email'
                      {...field}
                      className={`w-full  ring-0   ${
                        form.formState.errors.email
                          ? 'focus:border-red-500 border-red-500 focus:ring-red-500 focus-visible:ring-0'
                          : 'focus:border-primary border-gray-300   text-gray-600'
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormControl className='py-6 bg-[#E0E0E9] rounded-sm shadow-lg shadow-[#F9F9F9]'>
                    <Input
                      placeholder='Enter Username'
                      {...field}
                      className={`w-full  ring-0   ${
                        form.formState.errors.username
                          ? 'focus:border-red-500 border-red-500 focus:ring-red-500 focus-visible:ring-0'
                          : 'focus:border-primary border-gray-300   text-gray-600'
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormControl className='py-6 bg-[#E0E0E9] rounded-sm shadow-lg shadow-[#F9F9F9]'>
                    <Input
                      placeholder='Enter firstName'
                      {...field}
                      className={`w-full  ring-0   ${
                        form.formState.errors.firstName
                          ? 'focus:border-red-500 border-red-500 focus:ring-red-500 focus-visible:ring-0'
                          : 'focus:border-primary border-gray-300   text-gray-600'
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormControl className='py-6 bg-[#E0E0E9] rounded-sm shadow-lg shadow-[#F9F9F9]'>
                    <Input
                      placeholder='Enter lastName'
                      {...field}
                      className={`w-full  ring-0   ${
                        form.formState.errors.lastName
                          ? 'focus:border-red-500 border-red-500 focus:ring-red-500 focus-visible:ring-0'
                          : 'focus:border-primary border-gray-300   text-gray-600'
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormControl className='py-6 bg-[#E0E0E9] rounded-sm shadow-lg shadow-[#F9F9F9]'>
                    <Input
                      placeholder='Enter phone'
                      {...field}
                      className={`w-full  ring-0   ${
                        form.formState.errors.phone
                          ? 'focus:border-red-500 border-red-500 focus:ring-red-500 focus-visible:ring-0'
                          : 'focus:border-primary border-gray-300   text-gray-600'
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl className=' mb-0 py-6 bg-[#E0E0E9]  rounded-sm shadow-lg shadow-[#F9F9F9]'>
                    <Input
                      placeholder='Enter password'
                      {...field}
                      className={`w-full  ring-0   ${
                        form.formState.errors.password
                          ? 'focus:border-red-500 border-red-500 focus:ring-red-500 focus-visible:ring-0'
                          : 'focus:border-primary border-gray-300   text-gray-600'
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='rePassword'
              render={({ field }) => (
                <FormItem>
                  <FormControl className=' mb-0 py-6 bg-[#E0E0E9]  rounded-sm shadow-lg shadow-[#F9F9F9]'>
                    <Input
                      placeholder='Confirm password'
                      {...field}
                      className='w-full  focus:border-primary  border border-gray-300 text-gray-600'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* error message  */}
            {error && <p className='text-red-500 text-sm'>{error.message}</p>}

            <Button type='submit' className='py-6 w-full   drop-shadow-[#2F1C1C1A] shadow-lg'>
              {isPending ? 'Loading...' : 'Sign Up'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
