
import QuestionDialog from './questions-dialog';
import { BookCheck } from 'lucide-react';
import { getExams } from '@/lib/api/exam.api';



export default async function ExamsList() {
  const payload = await getExams();
  return (
    <div>
      <h2 className='text-2xl font-bold mb-2'>Exam</h2>
      <div className='flex flex-col gap-4 w-full'>
        {payload?.exams.map((item) => (
          <div
            key={item._id}
            className='p-4 flex bg-white justify-between rounded-lg shadow-sm items-center w-full'
          >
            <div className='flex items-center gap-4'>
              <BookCheck size={32} className='text-gray-600' />
              <div>
                <h3 className='text-lg font-semibold'>{item.title}</h3>
                <p className='text-gray-500 mt-1'>{item.numberOfQuestions} Question</p>
              </div>
            </div>
            <div className='text-center space-y-2'>
              <p className='text-sm text-gray-800 '>{item.duration} Minutes</p>
              <QuestionDialog searchParams={item._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
