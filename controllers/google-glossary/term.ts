import { Controller } from '@/types/controller';
import { MyGoogleGlossary, MyGoogleTerm, Term } from '@/types/models';
import { createJWTClient } from './utils';

const createTerm: Controller = async (req, res) => {
  const glossaryName = req.query['glossary-name'];
  const receivedBody = req.body as Term;

  const client = createJWTClient();
  const googleAPIResponse = await client.request<GoogleAPICreateResponse>({
    url: `https://translate.googleapis.com/v3/projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1/glossaries/${glossaryName}/glossaryEntries`,
    method: 'POST',
    data: toRequestBody(receivedBody),
  });

  if (googleAPIResponse.data) return res.status(200).end();
  return res.status(200).json({ message: '서버 오류가 발생했습니다.' });
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
      index: getTermIndex(googleGlossaryEntry.name),
      english: googleGlossaryEntry.termsPair.sourceTerm.text,
      korean: googleGlossaryEntry.termsPair.targetTerm.text,
    };
  }

  function getTermIndex(name: GoogleGlossaryEntry['name']): string {
    const array = name.split('/');
    return array[array.length - 1];
  }
};

const updateTerm: Controller = async (req, res) => {
  const glossaryName = req.query['glossary-name'] as MyGoogleGlossary['name'];
  const termIndex = req.query['term-index'] as MyGoogleTerm['index'];
  const receivedBody = req.body as Term;

  const client = createJWTClient();
  const googleAPIResponse = await client.request<GoogleAPIUpdateResponse>({
    url: `https://translate.googleapis.com/v3/projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1/glossaries/${glossaryName}/glossaryEntries/${termIndex}`,
    method: 'PATCH',
    data: toRequestBody(receivedBody),
  });

  if (googleAPIResponse.data) return res.status(200).end();
  return res.status(200).json({ message: '서버 오류가 발생했습니다.' });
};

const deleteTerm: Controller = async (req, res) => {
  const glossaryName = req.query['glossary-name'] as MyGoogleGlossary['name'];
  const termIndex = req.query['term-index'] as MyGoogleTerm['index'];

  const client = createJWTClient();
  await client.request({
    url: `https://translate.googleapis.com/v3/projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1/glossaries/${glossaryName}/glossaryEntries/${termIndex}`,
    method: 'DELETE',
  });

  return res.status(200).end();
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

function toRequestBody(receivedBody: Term): PostRequestBody {
  return {
    termsPair: {
      sourceTerm: { languageCode: 'en', text: receivedBody.english },
      targetTerm: { languageCode: 'ko', text: receivedBody.korean },
    },
  };
}

interface GoogleAPIGetListResponse {
  glossaryEntries: GoogleGlossaryEntry[];
}
type GoogleAPICreateResponse = GoogleGlossaryEntry;
type GoogleAPIUpdateResponse = GoogleGlossaryEntry;

export { createTerm, getTerms, updateTerm, deleteTerm };
