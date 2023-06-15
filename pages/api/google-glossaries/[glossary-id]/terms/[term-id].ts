import { deleteTerm, updateTerm } from '@/controllers/google-glossary/term';
import { handler } from '@/utils/api';

export default handler({
  PUTController: updateTerm,
  DELETEController: deleteTerm,
});
