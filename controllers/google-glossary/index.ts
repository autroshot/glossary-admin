import { Controller } from '@/types/controller';
import { Glossary } from '@/types/models';
import { createJWTClient } from './utils';

const getGlossaries: Controller = async (req, res) => {
  const client = createJWTClient();

  const googleAPIresponse =
    await client.request<GetGlossariesGoogleAPIResponse>({
      url: `https://translate.googleapis.com/v3/projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1/glossaries`,
    });
  const glossaries = googleAPIresponse.data.glossaries;

  return res.status(200).json({ data: glossaries });
};

interface GetGlossariesGoogleAPIResponse {
  glossaries: Glossary[];
}

export { getGlossaries };
