import GlossaryTable from '@/components/google-glossary/glossary/table';
import { Box, Container, Heading } from '@chakra-ui/react';

export default function GoogleGlossaryList() {
  return (
    <Container>
      <Heading textAlign="center">구글 용어집 목록</Heading>
      <Box mt="5">
        <GlossaryTable />
      </Box>
    </Container>
  );
}
