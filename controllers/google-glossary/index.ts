import { Controller } from '@/types/controller';
import { Glossary } from '@/types/models';
import { JWT } from 'google-auth-library';

const getGlossaries: Controller = async (req, res) => {
  const client = new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: String(process.env.GOOGLE_PRIVATE_KEY).replace(/\\n/gm, '\n'),
    scopes: [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/cloud-translation',
    ],
  });

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
