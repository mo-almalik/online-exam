import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import QuestionsForm from './questions-form';
import { getQuestion } from '@/lib/api/question.api';

type QuestionDialogProps = {
  searchParams: any;
};

export default async function QuestionDialog({ searchParams }: QuestionDialogProps) {
  const payload = await getQuestion(searchParams as string);
 

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='h-8 px-10 rounded-2xl' size={'sm'}>
            Start
          </Button>
        </DialogTrigger>
        <DialogContent className='min-h-[400px]'>
          {/* header */}
          <DialogHeader>
            <DialogTitle className='hidden'>title</DialogTitle>
            {/* Description */}
            <DialogDescription className='hidden'>test</DialogDescription>
          </DialogHeader>
          {/* content */}
          <QuestionsForm questions={payload?.questions} />
        </DialogContent>
      </Dialog>
    </>
  );
}
