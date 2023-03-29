import { MyGoogleTerm } from '@/types/models';
import {
  Box,
  Button,
  Container,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getTerms } from './fetchers';
import TermFormDrawer from './form-drawer';
import TermTable from './table';

export default function TermContainer() {
  const [terms, setTerms] = useState<MyGoogleTerm[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const glossaryName = router.query['glossary-name'];

  useEffect(() => {
    getTerms(String(glossaryName)).then((newTerms) => {
      setTerms(newTerms);
    });
  }, [glossaryName]);

  return (
    <>
      <Container>
        <Heading textAlign="center">구글 용어집 상세</Heading>
        <Button onClick={onOpen}>양식 열기</Button>
        <Box mt="5">
          <TermTable terms={terms} />
        </Box>
      </Container>
      <TermFormDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
}
