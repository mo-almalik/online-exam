import SubjectsList from '@/components/features/subject/subject-list';
import { JSON_HEADER } from '@/lib/constants/api.constants';
import { SubjectsResponse } from '@/lib/types/subject';
import { getToken } from '@/lib/utils/getToken';

async function getSubjects() {
  const authToken = await getToken();

  const subjects = await fetch(`${process.env.API}/subjects`, {
    method: 'GET',
    headers: {
      ...JSON_HEADER,
      token: authToken as string,
    },
    cache: 'no-store',
  });

  const payload: SubjectsResponse = await subjects.json(); // Incorrect type, potential error might happen

  return payload;
}

export default async function Subjects() {
  const payload = await getSubjects();

  return (
    <>
      <div className='bg-white p-5 rounded-lg'>
        <h2 className='text-primary font-bold mb-6'>Subjects</h2>
        <SubjectsList subjects={payload?.subjects} />
      </div>
    </>
  );
}
