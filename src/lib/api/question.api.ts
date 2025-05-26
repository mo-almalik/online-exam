'use server';
import { getToken } from '@/lib/utils/getToken';
import { JSON_HEADER } from '../constants/api.constants';

// export async function getQuestions(searchParams: string) {
//   console.log('searchParamssssssssssss', searchParams);
//   const token = await getToken();
//   const response = await fetch(`${process.env.API}/questions?${searchParams}`, {
//     headers: {
//       ...JSON_HEADER,
//       token: token || ' ',
//     },
//   });
//   const payload: APIResponse<{ questions: Question[] }> = await response.json();
//   if ('code' in payload) {
//     throw new Error(payload.message);
//   }
//   return payload;
// }

export async function getQuestion(searchParams: string) {
  const token = await getToken();
  const response = await fetch(`${process.env.API}/questions?exam=${searchParams}`, {
    headers: {
      ...JSON_HEADER,
      token: token || ' ',
    },
  });

  const payload: APIResponse<{ questions: Question[] }> = await response.json();

  if ('code' in payload) {
    throw new Error(payload.message);
  }

  return payload;
}
