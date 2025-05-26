'use client';

import { Subject } from '@/lib/types/subject';
import Image from 'next/image';
import Link from 'next/link';

export default function SubjectsList({ subjects, limit }: { subjects: Subject[]; limit?: number }) {
  if (!subjects || subjects.length === 0) {
    return <div className='text-center text-gray-500 mt-3'>No subjects available</div>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 '>
      {subjects?.slice(0, limit).map((subject) => (
        <Link
          href='/dashboard/exams'
          key={subject._id}
          className='flex items-center gap-2 relative'
        >
          <Image
            width={400}
            height={400}
            src={subject?.icon}
            alt={subject.name}
            className='rounded-xl'
          />
          <div className='absolute bottom-5 bg-[#1100FF66] backdrop-blur-md w-[90%] mx-auto left-3 z-10 right-3 p-4 rounded-lg '>
            <h2 className='text-white text-lg font-bold z-50'>{subject.name}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
