import { getGlossaries } from '@/controllers/google-glossary';
import { controllerSwitch } from '@/utils/api';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await controllerSwitch(req, res, {
    GETController: getGlossaries,
  });
}