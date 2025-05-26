'use client';
import { AlarmClock } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type ExamDurationProps = {
  duration: number;  
  onFinish: (elapsedMinutes: number) => void;
};

export default function ExamDuration({ duration, onFinish }: ExamDurationProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60); 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onFinish(duration);  
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onFinish]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className='flex items-center gap-2 leading-none'>
      <AlarmClock size={20} className='text-gray-600' />
      <span className='text-green-500 font-semibold'>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
