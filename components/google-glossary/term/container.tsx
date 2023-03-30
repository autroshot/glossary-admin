import { MyGoogleTerm } from '@/types/models';
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
import { useForm } from 'react-hook-form';
import { createTerm, deleteTerm, getTerms } from './fetchers';
import TermFormDrawer from './form-drawer';
import TermTable from './table';

export default function TermContainer() {
  const [terms, setTerms] = useState<MyGoogleTerm[]>([]);
  const [mode, setMode] = useState<'create' | 'update'>('create');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const glossaryId = router.query['glossary-id'];

  useEffect(() => {
    if (typeof glossaryId !== 'string') return;

    getTerms(glossaryId).then((newTerms) => {
      setTerms(newTerms);
    });
  }, [glossaryId]);

  const form = useForm<MyGoogleTerm>();
  const { getValues, setValue } = form;

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
        form={form}
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
    setValue('index', '');
    setValue('english', '');
    setValue('korean', '');
    onOpen();
  }
  function handleModifyButtonClick(term: MyGoogleTerm) {
    setMode('update');
    setValue('index', term.index);
    setValue('english', term.english);
    setValue('korean', term.korean);
    onOpen();
  }

  function onSubmit(data: MyGoogleTerm): unknown | Promise<unknown> {
    if (typeof glossaryId !== 'string') return;

    if (mode === 'create') {
      createTerm(glossaryId, {
        english: data.english,
        korean: data.korean,
      }).then(() => {
        onClose();
        console.log('생성 완료!');
      });
    }
  }
  function handleDeleteButtonClick() {
    if (typeof glossaryId !== 'string') return;

    onClose();
    deleteTerm(glossaryId, getValues('index')).then(() => {
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
        <Button type="submit" form="drawer-form">
          생성
        </Button>
      );
    }
    return (
      <ButtonGroup>
        <Button colorScheme="red" onClick={handleDeleteButtonClick}>
          삭제
        </Button>
        <Button type="submit" form="drawer-form">
          수정
        </Button>
      </ButtonGroup>
    );
  }
}
