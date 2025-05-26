import { getToken } from '@/lib/utils/getToken';
import { JSON_HEADER } from '../constants/api.constants';

export async function getExams() {
  const token = await getToken();

  const response = await fetch(`${process.env.API}/exams`, {
    method: 'GET',
    headers: {
      ...JSON_HEADER,
      token: token || ' ',
    },
  });

  const payload: APIResponse<PaginatedResponse<{ exams: Exam[] }>> = await response.json(); // No type for Exam

  if ('code' in payload) {
    throw new Error(payload.message);
  }

  return payload;
}
