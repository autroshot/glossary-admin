import { translate } from '@/controllers/google-glossary/translate';
import { controllerSwitch } from '@/utils/api';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await controllerSwitch(req, res, {
    POSTController: translate,
  });
}
