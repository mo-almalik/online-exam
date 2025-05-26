import SubjectsList from '@/components/features/subject/subject-list';
import { JSON_HEADER } from '@/lib/constants/api.constants';
import { SubjectsResponse } from '@/lib/types/subject';
import { getToken } from '@/lib/utils/getToken';

export default async function Subjects() {
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
      <div className='bg-white p-5 rounded-lg'>
        <h2 className='text-primary font-bold mb-6'>Subjects</h2>
        <SubjectsList subjects={subjectsData?.subjects} />
      </div>
    </>
  );
}
