import { Controller } from '@/types/controller';
import { PARENT } from './constants';
import { createTranslationServiceClient } from './utils';

const createGlossary: Controller = async (req, res) => {
  const client = createTranslationServiceClient();

  const result = await client.createGlossary({
    parent: PARENT,
    glossary: {
      name: `projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1/glossaries/my-glossary2`,
      languagePair: { sourceLanguageCode: 'en', targetLanguageCode: 'ko' },
      inputConfig: {
        gcsSource: {
          inputUri: process.env.GOOGLE_GLOSSARY_INPUT_URI,
        },
      },
    },
  });
  console.log(result);

  return res.status(200).json({ message: '용어집 생성 완료!' });
};

const getGlossaries: Controller = async (req, res) => {
  const client = createTranslationServiceClient();

  const queryResult = await client.listGlossaries({
    parent: PARENT,
  });
  const glossaries = queryResult[0];

  return res.status(200).json({ data: glossaries });
};

export { createGlossary, getGlossaries };
