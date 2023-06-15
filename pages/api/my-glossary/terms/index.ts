import { createTerm, getTerms } from '@/controllers/my-glossary/terms';
import { handler } from '@/utils/api';

export default handler({
  POSTController: createTerm,
  GETController: getTerms,
});
