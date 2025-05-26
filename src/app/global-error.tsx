'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error() {
  return (
    <html>
      <body>
        <main className='h-screen flex items-center justify-center flex-col'>
          {/* Title */}
          <h2 className='text-2xl font-bold mb-7'>Error</h2>

          {/* Headline */}
          <p className='text-red-500'>Something went wrong. Please try again.</p>

          {/* Navigate */}
          <Button asChild variant='outline' className='mt-4'>
            <Link href={'/dashboard'}>Go Dashboard</Link>
          </Button>
        </main>
      </body>
    </html>
  );
}
