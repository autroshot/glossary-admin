import { createTerm, getTerms } from '@/controllers/google-glossary/term';
import { controllerSwitch } from '@/utils/api';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await controllerSwitch(req, res, {
    POSTController: createTerm,
    GETController: getTerms,
  });
}