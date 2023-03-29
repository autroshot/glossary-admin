import { TranslationServiceClient } from '@google-cloud/translate';
import { JWT } from 'google-auth-library';

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

export function createJWTClient(): JWT {
  return new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: String(process.env.GOOGLE_PRIVATE_KEY).replace(/\\n/gm, '\n'),
    scopes: [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/cloud-translation',
    ],
  });
}
