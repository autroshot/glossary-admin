import TermFormDrawer from '@/components/google-glossary/term/form-drawer';
import TermTable from '@/components/google-glossary/term/table';
import {
  Box,
  Button,
  Container,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function GoogleGlossaryDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const displayName = router.query['display-name'];

  return (
    <>
      <Container>
        <Heading textAlign="center">구글 용어집 상세</Heading>
        <Box>{displayName}</Box>
        <Button onClick={onOpen}>양식 열기</Button>
        <Box mt="5">
          <TermTable />
        </Box>
      </Container>
      <TermFormDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
}
