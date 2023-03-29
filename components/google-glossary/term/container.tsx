import { MyGoogleTerm, Term } from '@/types/models';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { createTerm, deleteTerm, getTerms } from './fetchers';
import TermFormDrawer from './form-drawer';
import TermTable from './table';

export default function TermContainer() {
  const [terms, setTerms] = useState<MyGoogleTerm[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<MyGoogleTerm>();
  const [mode, setMode] = useState<'create' | 'update'>('create');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const glossaryName = router.query['glossary-name'];

  useEffect(() => {
    if (typeof glossaryName !== 'string') return;

    getTerms(glossaryName).then((newTerms) => {
      setTerms(newTerms);
    });
  }, [glossaryName]);

  const onSubmit: SubmitHandler<Term> = async (data) => {
    if (typeof glossaryName !== 'string') return;

    if (mode === 'create') {
      await createTerm(glossaryName, {
        english: data.english,
        korean: data.korean,
      });
      console.log('생성 완료!');
    }
  };

  return (
    <>
      <Container maxW="container.sm" mb="10">
        <Heading textAlign="center">구글 용어집 상세</Heading>
        <Box mt="5">
          <Button onClick={handleCreateButtonClick}>생성</Button>
        </Box>
        <Box mt="5">
          <TermTable
            terms={terms}
            onModifyButtonClick={handleModifyButtonClick}
          />
        </Box>
      </Container>
      <TermFormDrawer
        isOpen={isOpen}
        headerText={createFormDrawerHeaderText()}
        buttons={createFormDrawerButtons()}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </>
  );

  function handleCreateButtonClick() {
    setMode('create');
    onOpen();
  }

  function handleModifyButtonClick(term: MyGoogleTerm) {
    setSelectedTerm(term);
    setMode('update');
    onOpen();
  }

  function handleDeleteButtonClick() {
    if (typeof glossaryName !== 'string') return;
    if (!selectedTerm) return;

    onClose();
    deleteTerm(glossaryName, selectedTerm.index).then(() => {
      console.log('삭제 완료!');
    });
  }

  function createFormDrawerHeaderText(): string {
    if (mode === 'create') return '용어 생성';
    return '용어 수정/삭제';
  }
  function createFormDrawerButtons(): ReactNode {
    if (mode === 'create') {
      return (
        <Button type="submit" form="my-form">
          생성
        </Button>
      );
    }
    return (
      <ButtonGroup>
        <Button colorScheme="red" onClick={handleDeleteButtonClick}>
          삭제
        </Button>
        <Button type="submit" form="my-form">
          수정
        </Button>
      </ButtonGroup>
    );
  }
}
