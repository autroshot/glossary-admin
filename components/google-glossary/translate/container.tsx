import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import Input from './input';
import Output from './output';

export default function TranslateContainer() {
  return (
    <Container maxW="container.md" mb="10">
      <Heading textAlign="center">번역하기</Heading>
      <Box mt="5">
        <SimpleGrid columns={2} spacing="5">
          <Input />
          <Output />
        </SimpleGrid>
      </Box>
    </Container>
  );
}
