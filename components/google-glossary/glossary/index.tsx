import { Box, Container, Heading } from '@chakra-ui/react';
import Table from './table';

export default function Glossary() {
  return (
    <Container mb="10">
      <Heading textAlign="center">구글 용어집 목록</Heading>
      <Box mt="5">
        <Table />
      </Box>
    </Container>
  );
}
