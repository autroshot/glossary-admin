import { Controller } from '@/types/controller';
import { MyGoogleTerm, Term } from '@/types/models';
import { createJWTClient } from './utils';

const createTerm: Controller = async (req, res) => {
  const glossaryName = req.query['glossary-name'];
  const receivedBody = req.body as Term;

  const client = createJWTClient();
  const googleAPIResponse = await client.request<GoogleAPICreateResponse>({
    url: `https://translate.googleapis.com/v3/projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1/glossaries/${glossaryName}/glossaryEntries`,
    method: 'POST',
    data: toPostRequestBody(receivedBody),
  });

  if (googleAPIResponse.data) return res.status(200).end();
  return res.status(200).json({ message: '서버 오류가 발생했습니다.' });

  function toPostRequestBody(receivedBody: Term): PostRequestBody {
    return {
      termsPair: {
        sourceTerm: { languageCode: 'en', text: receivedBody.english },
        targetTerm: { languageCode: 'ko', text: receivedBody.korean },
      },
    };
  }
};

const getTerms: Controller = async (req, res) => {
  const glossaryName = req.query['glossary-name'];

  const client = createJWTClient();
  const googleAPIResponse = await client.request<GoogleAPIGetListResponse>({
    url: `https://translate.googleapis.com/v3/projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1/glossaries/${glossaryName}/glossaryEntries`,
    method: 'GET',
  });

  const googleGlossaryEntries = googleAPIResponse.data.glossaryEntries;
  const myGoogleTerms = googleGlossaryEntries.map(toMyGoogleTerm);

  return res.status(200).json({ data: myGoogleTerms });

  function toMyGoogleTerm(
    googleGlossaryEntry: GoogleGlossaryEntry
  ): MyGoogleTerm {
    return {
      path: googleGlossaryEntry.name,
      english: googleGlossaryEntry.termsPair.sourceTerm.text,
      korean: googleGlossaryEntry.termsPair.targetTerm.text,
    };
  }
};

type PostRequestBody = Pick<GoogleGlossaryEntry, 'termsPair'>;

interface GoogleGlossaryEntry {
  name: string;
  description?: string;
  termsPair: {
    sourceTerm: {
      languageCode: 'en';
      text: string;
    };
    targetTerm: {
      languageCode: 'ko';
      text: string;
    };
  };
}

interface GoogleAPIGetListResponse {
  glossaryEntries: GoogleGlossaryEntry[];
}

type GoogleAPICreateResponse = GoogleGlossaryEntry;

export { createTerm, getTerms };
