import ExamsList from './_components/exams-list';
import { Suspense } from 'react';


async function Exam() {
  return (
    <>
      <Suspense fallback='loading...'>
        <ExamsList  />
      </Suspense>
    </>
  );
}

export default Exam;
