import SubjectsList from '@/components/features/subject/subject-list';
import { SubjectsResponse } from '@/lib/types/subject';
import { getToken } from '@/lib/utils/getToken';
import Link from 'next/link';

export default async function Admin() {
  const authToken = await getToken();

  const subjects = await fetch(`${process.env.API}/subjects`, {
    method: 'GET',
    headers: {
      token: authToken as string,
    },
    cache: 'no-store',
  });
  const subjectsData: SubjectsResponse = await subjects.json();
  return (
    <div>
      <div className='bg-white p-5 rounded-lg'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-primary font-bold'>Subjects</h2>
          <Link href='/admin/subjects' className='text-primary font-bold'>
            View All
          </Link>
        </div>

        <SubjectsList subjects={subjectsData?.subjects} limit={6} />
      </div>
    </div>
  );
}
