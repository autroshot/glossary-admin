import { getGlossaries } from '@/controllers/google-glossary/glossary';
import { handler } from '@/utils/api';

export default handler({
  GETController: getGlossaries,
});
