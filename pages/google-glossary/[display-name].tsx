import TermTable from '@/components/google-glossary/term-table';
import { Box, Container, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function GoogleGlossaryDetail() {
  const router = useRouter();
  const displayName = router.query['display-name'];

  return (
    <Container>
      <Heading textAlign="center">구글 용어집 상세</Heading>
      <Box>{displayName}</Box>
      <Box mt="5">
        <TermTable />
      </Box>
    </Container>
  );
}
