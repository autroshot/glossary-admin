import { Controller } from '@/types/controller';
import { MyGoogleTerm } from '@/types/models';
import { createJWTClient } from './utils';

const getTerms: Controller = async (req, res) => {
  const { name } = req.query;

  const client = createJWTClient();
  const googleAPIResponse = await client.request<GoogleAPIResponse>({
    url: `https://translate.googleapis.com/v3/projects/${process.env.GOOGLE_PROJECT_NUMBER}/locations/us-central1/glossaries/${name}/glossaryEntries`,
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

interface GoogleGlossaryEntry {
  name: string;
  description: string;
  termsPair: {
    sourceTerm: GlossaryTerm;
    targetTerm: GlossaryTerm;
  };
}

interface GlossaryTerm {
  languageCode: string;
  text: string;
}

interface GoogleAPIResponse {
  glossaryEntries: GoogleGlossaryEntry[];
}
