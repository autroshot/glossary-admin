import { createGlossary } from '@/fetchers';
import { Box, Button, Container, Heading } from '@chakra-ui/react';

export default function GoogleGlossary() {
  return (
    <Container>
      <Heading>구글 용어집</Heading>
      <Box mt="3">
        <Button onClick={handleCreateGlossaryButtonClick}>용어집 생성</Button>
      </Box>
      <Box mt="3">
        <Button>용어집들 읽기</Button>
      </Box>
    </Container>
  );

  async function handleCreateGlossaryButtonClick(): Promise<void> {
    const res = await createGlossary();

    console.log(res);
  }
}
