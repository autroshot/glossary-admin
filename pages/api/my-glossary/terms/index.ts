import {
  createTerm,
  getTerms,
  updateTerm,
} from '@/controllers/my-glossary/terms';
import { handler } from '@/utils/api';

export default handler({
  POSTController: createTerm,
  GETController: getTerms,
  PUTController: updateTerm,
});
