import { getToken } from '@/lib/utils/getToken';

export default async function page() {
  const JWT = await getToken();
  const res = await fetch(`${process.env.API}/questions/history`, {
    headers: {
      token: JWT || '',
    },
  });
  const payload = await res.json();

  return <div>quiz history</div>;
}
