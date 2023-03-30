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
import { createTerm, deleteTerm, getTerms, updateTerm } from './fetchers';
import TermFormDrawer from './form-drawer';
import TermTable from './table';

export default function TermContainer() {
  const [terms, setTerms] = useState<MyGoogleTerm[]>([]);
  const [mode, setMode] = useState<'create' | 'update'>('create');

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
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
        isOpen={isDrawerOpen}
        headerText={createFormDrawerHeaderText()}
        buttons={createFormDrawerButtons()}
        onClose={onDrawerClose}
        onSubmit={onSubmit}
      />
    </>
  );

  function handleCreateButtonClick() {
    setMode('create');
    setValue('id', '');
    setValue('english', '');
    setValue('korean', '');
    onDrawerOpen();
  }
  function handleModifyButtonClick(term: MyGoogleTerm) {
    setMode('update');
    setValue('id', term.id);
    setValue('english', term.english);
    setValue('korean', term.korean);
    onDrawerOpen();
  }

  function onSubmit(data: MyGoogleTerm): unknown | Promise<unknown> {
    if (typeof glossaryId !== 'string') return;

    const termId = data.id;
    const english = data.english;
    const korean = data.korean;

    if (mode === 'create') {
      createTerm(glossaryId, {
        english,
        korean,
      }).then(() => {
        onDrawerClose();
        console.log('생성 완료!');
      });

      return;
    }

    updateTerm(glossaryId, termId, { english, korean }).then(() => {
      onDrawerClose();
      console.log('갱신 완료!');
    });
  }
  function handleDeleteButtonClick() {
    if (typeof glossaryId !== 'string') return;

    onDrawerClose();
    deleteTerm(glossaryId, getValues('id')).then(() => {
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
