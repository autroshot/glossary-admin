import TermContainer from '@/components/google-glossary/term/container';
import { useRouter } from 'next/router';

export default function Detail() {
  const router = useRouter();
  const glossaryId = router.query['glossary-id'];

  if (typeof glossaryId !== 'string') return null;
  return <TermContainer glossaryId={glossaryId} />;
}
