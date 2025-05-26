import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export default function useQuestions() {
  const searchParams = useSearchParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ['exams'],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/questions?${searchParams.toString()}`,
      );

      const payload: APIResponse<PaginatedResponse<{ questions: Question[] }>> =
        await response.json();
      if ('code' in payload) {
        throw new Error(payload.message);
      }
      return payload;
    },
  });
  return { isLoading, payload: data, error };
}
