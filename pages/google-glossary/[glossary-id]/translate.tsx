import Component from '@/components/google-glossary/translate';
import { useRouter } from 'next/router';

export default function Translate() {
  const router = useRouter();
  const glossaryId = router.query['glossary-id'];

  if (typeof glossaryId !== 'string') return null;
  return <Component glossaryId={glossaryId} />;
}
