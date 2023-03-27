import { Controller } from '@/types/controller';
import { PARENT } from './constants';
import { createTranslationServiceClient } from './utils';

const getGlossaries: Controller = async (req, res) => {
  const client = createTranslationServiceClient();

  const queryResult = await client.listGlossaries({
    parent: PARENT,
  });
  const glossaries = queryResult[0];

  return res.status(200).json({ data: glossaries });
};

export { getGlossaries };
