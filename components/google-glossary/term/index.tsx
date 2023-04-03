import ButtonLink from '@/components/button-link';
import { MyGoogleTerm } from '@/types/models';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  Spacer,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import TermFormDrawer from './form-drawer';
import { useTerms } from './hooks';
import TermTable from './table';

export default function Term({ glossaryId }: Props) {
  const [mode, setMode] = useState<'create' | 'update'>('create');

  const {
    terms,
    creationMutate,
    updationMutate,
    deletionMutate,
    isLoading,
    isProcessing,
  } = useTerms(glossaryId);

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
        <Flex mt="5">
          <Box>
            <Button onClick={handleCreateButtonClick}>용어 생성</Button>
          </Box>
          <Spacer />
          <ButtonLink
            size="md"
            text="이 용어집으로 번역하기"
            href={`/google-glossary/${glossaryId}/translate`}
          />
        </Flex>
        <Box mt="5">
          <TermTable
            terms={terms ?? []}
            isLoading={isLoading}
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
    const termId = data.id;
    const english = data.english;
    const korean = data.korean;

    if (mode === 'create') {
      creationMutate(
        { term: { english, korean } },
        {
          onSuccess: () => {
            onDrawerClose();
            toast({ title: '용어가 생성되었습니다.', status: 'success' });
          },
        }
      );

      return;
    }

    updationMutate(
      { termId, term: { english, korean } },
      {
        onSuccess: () => {
          onDrawerClose();
          toast({ title: '용어가 갱신되었습니다.', status: 'success' });
        },
      }
    );

    return;
  }
  function handleDeleteButtonClick() {
    deletionMutate(
      { termId: getValues('id') },
      {
        onSuccess: () => {
          onDrawerClose();
          toast({ title: '용어가 삭제되었습니다.', status: 'success' });
        },
      }
    );
  }

  function createFormDrawerHeaderText(): string {
    if (mode === 'create') return '용어 생성';
    return '용어 수정/삭제';
  }
  function createFormDrawerButtons(): ReactNode {
    if (mode === 'create') {
      return (
        <Button type="submit" form="drawer-form" isLoading={isProcessing}>
          생성
        </Button>
      );
    }
    return (
      <ButtonGroup>
        <Button
          colorScheme="red"
          isLoading={isProcessing}
          onClick={handleDeleteButtonClick}
        >
          삭제
        </Button>
        <Button type="submit" form="drawer-form" isLoading={isProcessing}>
          수정
        </Button>
      </ButtonGroup>
    );
  }
}

interface Props {
  glossaryId: string;
}
