import { getGlossaries } from '@/fetchers';
import { Box, Button, Container, Heading } from '@chakra-ui/react';

export default function GoogleGlossary() {
  return (
    <Container>
      <Heading>구글 용어집</Heading>
      <Box mt="3">
        <Button onClick={handleGetGlossariesButtonClick}>용어집들 읽기</Button>
      </Box>
    </Container>
  );

  async function handleGetGlossariesButtonClick(): Promise<void> {
    const res = await getGlossaries();

    console.log(res);
  }
}
