import {
  createTerm,
  deleteTerm,
  getTerms,
} from '@/controllers/google-glossary/term';
import { handler } from '@/utils/api';

export default handler({
  POSTController: createTerm,
  GETController: getTerms,
  DELETEController: deleteTerm,
});
