import { Controller } from '@/types/controller';
import { createDataResponse, createErrorResponse } from '../utils';
import { createJWTClient } from './utils';

const translate: Controller = async (req, res) => {
  const glossaryId = req.query['glossary-id'];
  const body = req.body as MyRequestBody;
  const text = body.text;

  const client = createJWTClient();
  const googleAPIResponse = await client.request<GoogleAPIResponse>({
    url: `https://translate.googleapis.com/v3/projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1:translateText`,
    method: 'POST',
    data: createGoogleAPIRequestBody(),
  });

  const translatedText =
    googleAPIResponse.data.glossaryTranslations[0].translatedText;

  if (googleAPIResponse.data)
    return res.status(200).json(createDataResponse(translatedText));
  return res.status(200).json(createErrorResponse('서버 오류가 발생했습니다.'));

  function createGoogleAPIRequestBody() {
    return {
      contents: text,
      sourceLanguageCode: 'en',
      targetLanguageCode: 'ko',
      glossaryConfig: {
        glossary: `projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1/glossaries/${glossaryId}`,
      },
    };
  }

  interface MyRequestBody {
    text: string;
  }

  interface GoogleAPIResponse {
    translations: [
      {
        translatedText: string;
      }
    ];
    glossaryTranslations: [
      {
        translatedText: string;
        glossaryConfig: {
          glossary: string;
          ignoreCase: boolean;
        };
      }
    ];
  }
};

export { translate };
