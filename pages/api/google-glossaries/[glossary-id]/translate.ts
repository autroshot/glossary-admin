import { translate } from '@/controllers/google-glossary/translate';
import { handler } from '@/utils/api';

export default handler({
  POSTController: translate,
});
