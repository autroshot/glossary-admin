import { Controller } from '@/types/controller';
import { TranslationServiceClient } from '@google-cloud/translate';
import { PARENT } from './constants';

const createGlossary: Controller = async (req, res) => {
  const client = new TranslationServiceClient({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: String(process.env.GOOGLE_PRIVATE_KEY).replace(
        /\\n/gm,
        '\n'
      ),
    },
  });

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
  const client = new TranslationServiceClient({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: String(process.env.GOOGLE_PRIVATE_KEY).replace(
        /\\n/gm,
        '\n'
      ),
    },
  });

  const queryResult = await client.listGlossaries({
    parent: PARENT,
  });
  const glossaries = queryResult[0];

  return res.status(200).json({ data: glossaries });
};

export { createGlossary, getGlossaries };
