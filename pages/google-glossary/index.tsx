import GlossaryTable from '@/components/google-glossary/glossary-table';
import { Container, Heading } from '@chakra-ui/react';

export default function GoogleGlossary() {
  return (
    <Container>
      <Heading>구글 용어집</Heading>
      <GlossaryTable />
    </Container>
  );
}