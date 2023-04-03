import Term from '@/components/google-glossary/term';
import { useRouter } from 'next/router';

export default function Detail() {
  const router = useRouter();
  const glossaryId = router.query['glossary-id'];

  if (typeof glossaryId !== 'string') return null;
  return <Term glossaryId={glossaryId} />;
}
