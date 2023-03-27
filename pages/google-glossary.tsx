import { Button, Container, Heading } from '@chakra-ui/react';

export default function GoogleGlossary() {
  return (
    <Container>
      <Heading>구글 용어집</Heading>
      <Button mt="3" onClick={() => console.log('용어집 생성')}>
        용어집 생성
      </Button>
    </Container>
  );
}
