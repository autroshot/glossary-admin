import { Controller } from '@/types/controller';
import { GoogleGlossary, MyGoogleGlossary } from '@/types/models';
import { createJWTClient } from './utils';

const getGlossaries: Controller = async (req, res) => {
  const client = createJWTClient();

  const googleAPIResponse =
    await client.request<GetGlossariesGoogleAPIResponse>({
      url: `https://translate.googleapis.com/v3/projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1/glossaries`,
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

interface GetGlossariesGoogleAPIResponse {
  glossaries: GoogleGlossary[];
}

export { getGlossaries };
