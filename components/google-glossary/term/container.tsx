import {
  Box,
  Button,
  Container,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { getTerms } from './fetchers';
import TermFormDrawer from './form-drawer';
import TermTable from './table';

export default function TermContainer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const { name } = router.query;

  return (
    <>
      <Container>
        <Heading textAlign="center">구글 용어집 상세</Heading>
        <Box>{name}</Box>
        <Button
          onClick={async () => {
            const result = await getTerms(String(name));
            console.log(result);
          }}
        >
          용어 목록 받기
        </Button>
        <Button onClick={onOpen}>양식 열기</Button>
        <Box mt="5">
          <TermTable />
        </Box>
      </Container>
      <TermFormDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
}
