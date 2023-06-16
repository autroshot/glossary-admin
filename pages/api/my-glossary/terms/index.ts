import {
  createTerm,
  getTerms,
  updateTerm,
} from '@/controllers/my-glossary/term';
import { handler } from '@/utils/api';

export default handler({
  POSTController: createTerm,
  GETController: getTerms,
  PUTController: updateTerm,
});
