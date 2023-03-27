import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    res.status(200).json({ message: '용어집 생성 완료!' });
  } else {
    res.status(405).end();
  }
}
