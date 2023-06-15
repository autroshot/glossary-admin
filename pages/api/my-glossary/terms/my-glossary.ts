import { getTerms } from '@/controllers/my-glossary/terms';
import { handler } from '@/utils/api';

export default handler({
  GETController: getTerms,
});
