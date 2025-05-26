'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AnswerFields, ExamSchema } from '@/lib/schemas/exam.schema';
import { cn } from '@/lib/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import ExamDuration from './exam-duration';

type QuestionDialogProps = {
  questions: Question[];
};

export default function QuestionsForm({ questions }: QuestionDialogProps) {
  // State
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState('');
  const [elapsed, setElapsed] = useState(0);

  // Variables
  const currentQuestion = questions[step];

  // form
  const form = useForm<AnswerFields>({
    resolver: zodResolver(ExamSchema),
  });
  if (questions.length === 0) {
    return <div className='flex justify-center items-center'>No Questions</div>;
  }

  // Functions
  const onSubmit: SubmitHandler<AnswerFields> = (data) => {
    console.log(data);
  };
  return (
    <>
      <div>
        <div className='flex flex-col gap-4 grow'>
          {/* Header */}
          <header className='flex items-center justify-between'>
            {/* Question number */}
            <p className='text-sm text-blue-600'>
              Question {step + 1} of {questions.length}
            </p>

            {/* duration */}
            <ExamDuration
              duration={questions[step].exam.duration}
              onFinish={(minutes) => setElapsed(minutes)}
            />
          </header>
          {/* Steps */}
          <ul className='flex items-center justify-between'>
            {Array.from({ length: questions.length }, (_, i) => i).map((i) => (
              <li
                key={i}
                className={cn(
                  'size-2 bg-gray-300 rounded-full transition-colors',
                  step >= i && 'bg-blue-600',
                )}
              />
            ))}
          </ul>
          {/* Question */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name={`answers.${step}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-lg font-semibold'>
                      {currentQuestion.question}
                    </FormLabel>

                    {/* selection */}
                    <FormControl>
                      <RadioGroup
                        value={answer}
                        onValueChange={(value) => {
                          setAnswer(value);
                          field.onChange({
                            questionId: currentQuestion._id,
                            correct: value,
                          });
                        }}
                        className='flex flex-col space-y-1 '
                        name={currentQuestion._id}
                      >
                        {currentQuestion.answers.map((answer) => (
                          <FormItem
                            className='flex items-center space-x-3 space-y-0 bg-gray-200 p-4 rounded-lg'
                            key={answer.key}
                          >
                            <FormControl>
                              <RadioGroupItem value={answer.key} />
                            </FormControl>
                            <FormLabel className='font-normal grow'>{answer.answer}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>

                    {/* feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* step controler */}
              <div className='grid grid-cols-1 md:grid-cols-2 space-x-7 mt-5'>
                {/* back */}
                <Button
                  disabled={step === 0}
                  type='button'
                  onClick={() => {
                    const prevAnswer = form.getValues(`answers.${step - 1}`);

                    if (!prevAnswer?.correct) {
                      setAnswer('');
                    } else {
                      setAnswer(prevAnswer.correct);
                    }

                    setStep((prev) => prev - 1);
                  }}
                  className=' rounded-full'
                  variant={'outline'}
                >
                  Back
                </Button>

                {/* next */}
                <Button
                  type={step < questions.length - 1 ? 'button' : 'submit'}
                  onClick={() => {
                    if (step === questions.length - 1) return;

                    const nextAnswer = form.getValues(`answers.${step + 1}`);

                    if (!nextAnswer?.correct) {
                      setAnswer('');
                    } else {
                      setAnswer(nextAnswer.correct);
                    }

                    setStep((prev) => prev + 1);
                  }}
                  className=' rounded-full'
                  variant={'outline'}
                >
                  {step < questions.length - 1 ? 'Next' : 'Submit'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
