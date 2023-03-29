import { Controller } from '@/types/controller';
import { GoogleGlossary } from '@/types/models';
import { createJWTClient } from './utils';

const getGlossaries: Controller = async (req, res) => {
  const client = createJWTClient();

  const googleAPIResponse =
    await client.request<GetGlossariesGoogleAPIResponse>({
      url: `https://translate.googleapis.com/v3/projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1/glossaries`,
    });

  return res.status(200).json({ data: googleAPIResponse.data.glossaries });
};

interface GetGlossariesGoogleAPIResponse {
  glossaries: GoogleGlossary[];
}

export { getGlossaries };
