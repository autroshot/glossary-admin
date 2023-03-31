import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';

export default function TranslateContainer() {
  return (
    <Container maxW="container.md" mb="10">
      <Heading textAlign="center">번역하기</Heading>
      <SimpleGrid columns={2} mt="5">
        <Box border="2px">입력</Box>
        <Box border="2px">출력</Box>
      </SimpleGrid>
    </Container>
  );
}
