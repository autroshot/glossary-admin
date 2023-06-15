import { Controller } from '@/types/controller';
import { getRows } from './utils';

const getTerms: Controller = async (req, res) => {
  const terms = await getRows();

  return res.status(200).json({ data: terms });
};

export { getTerms };
