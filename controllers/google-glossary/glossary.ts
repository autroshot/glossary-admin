import { Controller } from '@/types/controller';
import { MyGoogleGlossary } from '@/types/models';
import { createJWTClient } from './utils';

const getGlossaries: Controller = async (req, res) => {
  const client = createJWTClient();

  const googleAPIResponse = await client.request<GoogleAPIResponse>({
    url: `https://translate.googleapis.com/v3/projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1/glossaries`,
    method: 'GET',
  });

  const googleGlossaries = googleAPIResponse.data.glossaries;
  const myGoogleGlossaries = googleGlossaries.map(toMyGoogleGlossary);

  return res.status(200).json({ data: myGoogleGlossaries });

  function toMyGoogleGlossary(
    googleGlossary: GoogleGlossary
  ): MyGoogleGlossary {
    return { path: googleGlossary.name, name: googleGlossary.displayName };
  }
};

interface GoogleGlossary {
  name: string;
  inputConfig: {
    gcsSource: {
      inputUri: string;
    };
  };
  entryCount: number;
  submitTime: string;
  endTime: string;
  displayName: string;
  languagePair: {
    sourceLanguageCode: string;
    targetLanguageCode: string;
  };
}

interface GoogleAPIResponse {
  glossaries: GoogleGlossary[];
}

export { getGlossaries };
