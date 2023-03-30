import { MyGoogleGlossary, MyGoogleTerm, Term } from '@/types/models';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTerm, deleteTerm, getTerms, updateTerm } from './fetchers';
import TermFormDrawer from './form-drawer';
import TermTable from './table';

export default function TermContainer() {
  const [mode, setMode] = useState<'create' | 'update'>('create');

  const router = useRouter();
  const glossaryId = router.query['glossary-id'];

  const query = useQuery<MyGoogleTerm[]>({
    queryKey: ['google', 'glossaries', glossaryId],
    queryFn: () => {
      if (typeof glossaryId !== 'string') return [];
      return getTerms(glossaryId);
    },
  });

  const queryClient = useQueryClient();
  const createMutation = useMutation<void, AxiosError, CreateMutationFnParam>({
    mutationFn: async ({ glossaryId, term }) => {
      return createTerm(glossaryId, term);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['google', 'glossaries', glossaryId],
      });
      onDrawerClose();
      toast({ title: '용어가 생성되었습니다.', status: 'success' });
    },
  });
  const updateMutation = useMutation<void, AxiosError, UpdateMutationFnParam>({
    mutationFn: async ({ glossaryId, termId, term }) => {
      return updateTerm(glossaryId, termId, term);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['google', 'glossaries', glossaryId],
      });
      onDrawerClose();
      toast({ title: '용어가 갱신되었습니다.', status: 'success' });
    },
  });
  const deleteMutation = useMutation<void, AxiosError, DeleteMutationFnParam>({
    mutationFn: async ({ glossaryId, termId }) => {
      return deleteTerm(glossaryId, termId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['google', 'glossaries', glossaryId],
      });
      onDrawerClose();
      toast({ title: '용어가 삭제되었습니다.', status: 'success' });
    },
  });

  const toast = useToast();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

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
            terms={query.data ?? []}
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
      createMutation.mutate({ glossaryId, term: { english, korean } });

      return;
    }

    updateMutation.mutate({ glossaryId, termId, term: { english, korean } });

    return;
  }
  function handleDeleteButtonClick() {
    if (typeof glossaryId !== 'string') return;

    deleteMutation.mutate({ glossaryId, termId: getValues('id') });
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

  interface CreateMutationFnParam {
    glossaryId: MyGoogleGlossary['id'];
    term: Term;
  }
  interface UpdateMutationFnParam {
    glossaryId: MyGoogleGlossary['id'];
    termId: MyGoogleTerm['id'];
    term: Term;
  }
  interface DeleteMutationFnParam {
    glossaryId: MyGoogleGlossary['id'];
    termId: MyGoogleTerm['id'];
  }
}
