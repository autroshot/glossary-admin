import { TranslationServiceClient } from '@google-cloud/translate';

export function createTranslationServiceClient(): TranslationServiceClient {
  return new TranslationServiceClient({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: String(process.env.GOOGLE_PRIVATE_KEY).replace(
        /\\n/gm,
        '\n'
      ),
    },
  });
}
