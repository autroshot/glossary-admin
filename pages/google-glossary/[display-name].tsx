import { Box, Container, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function GoogleGlossaryDetail() {
  const router = useRouter();
  const displayName = router.query['display-name'];

  return (
    <Container>
      <Heading>구글 용어집 상세</Heading>
      <Box>{displayName}</Box>
    </Container>
  );
}
