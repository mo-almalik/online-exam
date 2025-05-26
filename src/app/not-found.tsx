import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='h-screen flex flex-col items-center justify-center w-full'>
      {/* 404 */}
      <h2 className='text-red-500 text-[55px] font-extrabold'>404</h2>

      {/* Title */}
      <p>Could not find requested resource</p>

      {/* Return home */}
      <Button asChild variant='outline' className='mt-4'>
        <Link href='/'>Return Home</Link>
      </Button>
    </main>
  );
}
