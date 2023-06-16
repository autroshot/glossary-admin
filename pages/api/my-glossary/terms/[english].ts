import { updateTerm } from '@/controllers/my-glossary/term';
import { handler } from '@/utils/api';

export default handler({
  PUTController: updateTerm,
});
