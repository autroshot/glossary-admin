import { Controller } from '@/types/controller';
import { GoogleTerm, MyGoogleGlossary, MyGoogleTerm } from '@/types/models';
import { createDataResponse, createErrorResponse } from '../utils';
import { createJWTClient } from './utils';

const createTerm: Controller = async (req, res) => {
  const glossaryId = req.query['glossary-id'];
  const receivedBody = req.body as GoogleTerm;

  const client = createJWTClient();
  const googleAPIResponse = await client.request<GoogleAPICreateResponse>({
    url: `https://translate.googleapis.com/v3/projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1/glossaries/${glossaryId}/glossaryEntries`,
    method: 'POST',
    data: toRequestBody(receivedBody),
  });

  if (googleAPIResponse.data) return res.status(200).end();
  return res.status(500).json(createErrorResponse('서버 오류가 발생했습니다.'));
};

const getTerms: Controller = async (req, res) => {
  const glossaryId = req.query['glossary-id'];

  const client = createJWTClient();
  const googleAPIResponse = await client.request<GoogleAPIGetListResponse>({
    url: `https://translate.googleapis.com/v3/projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1/glossaries/${glossaryId}/glossaryEntries`,
    method: 'GET',
  });

  const googleGlossaryEntries = googleAPIResponse.data.glossaryEntries;
  const myGoogleTerms = googleGlossaryEntries.map(toMyGoogleTerm);

  return res.status(200).json(createDataResponse(myGoogleTerms));

  function toMyGoogleTerm(
    googleGlossaryEntry: GoogleGlossaryEntry
  ): MyGoogleTerm {
    return {
      id: getTermId(googleGlossaryEntry.name),
      english: googleGlossaryEntry.termsPair.sourceTerm.text,
      korean: googleGlossaryEntry.termsPair.targetTerm.text,
    };
  }

  function getTermId(name: GoogleGlossaryEntry['name']): string {
    const array = name.split('/');
    return array[array.length - 1];
  }
};

const updateTerm: Controller = async (req, res) => {
  const glossaryId = req.query['glossary-id'] as MyGoogleGlossary['id'];
  const termId = req.query['term-id'] as MyGoogleTerm['id'];
  const receivedBody = req.body as GoogleTerm;

  const client = createJWTClient();
  const googleAPIResponse = await client.request<GoogleAPIUpdateResponse>({
    url: `https://translate.googleapis.com/v3/projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1/glossaries/${glossaryId}/glossaryEntries/${termId}`,
    method: 'PATCH',
    data: toRequestBody(receivedBody),
  });

  if (googleAPIResponse.data) return res.status(200).end();
  return res.status(500).json(createErrorResponse('서버 오류가 발생했습니다.'));
};

const deleteTerm: Controller = async (req, res) => {
  const glossaryId = req.query['glossary-id'] as MyGoogleGlossary['id'];
  const termId = req.query['term-id'] as MyGoogleTerm['id'];

  const client = createJWTClient();
  await client.request({
    url: `https://translate.googleapis.com/v3/projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1/glossaries/${glossaryId}/glossaryEntries/${termId}`,
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

function toRequestBody(receivedBody: GoogleTerm): PostRequestBody {
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
