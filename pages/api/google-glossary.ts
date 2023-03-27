import { TranslationServiceClient } from '@google-cloud/translate';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parent = `projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1`;

  if (req.method === 'GET') {
    req.body;

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
      parent,
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

    res.status(200).json({ message: '용어집 생성 완료!' });
  } else if (req.method === 'POST') {
    const client = new TranslationServiceClient({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: String(process.env.GOOGLE_PRIVATE_KEY).replace(
          /\\n/gm,
          '\n'
        ),
      },
    });

    const result = await client.listGlossaries({
      parent,
    });
    console.log(result);

    res.status(200).json({ message: '용어집 읽기 완료!' });
  } else {
    res.status(405).end();
  }
}
