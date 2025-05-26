import Link from 'next/link';

import { JSON_HEADER } from '@/lib/constants/api.constants';
import { SubjectsResponse } from '@/lib/types/subject';
import { getToken } from '@/lib/utils/getToken';
import Profile from './_components/profile';
import SubjectsList from '@/components/features/subject/subject-list';

export default async function Dashboard() {
  const authToken = await getToken();

  const subjects = await fetch(`${process.env.API}/subjects`, {
    method: 'GET',
    headers: {
      ...JSON_HEADER,
      token: authToken as string,
    },
    cache: 'no-store',
  });
  const subjectsData: SubjectsResponse = await subjects.json();

  return (
    <>
      <div>
        <Profile />
      </div>
      <div className='bg-white p-5 rounded-lg'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-primary font-bold'>Subjects</h2>
          <Link href='/dashboard/subjects' className='text-primary font-bold'>
            View All
          </Link>
        </div>

        <SubjectsList subjects={subjectsData?.subjects} limit={6} />
      </div>
    </>
  );
}
