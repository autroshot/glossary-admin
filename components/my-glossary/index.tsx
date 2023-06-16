import { MyTerm } from '@/types/models';
import { ErrorResponse } from '@/types/responses';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import TableSkeletons from '../table-skeletons';
import TermFormDrawer from './form-drawer';
import { useTerms } from './hooks';

export default function Glossary() {
  const [mode, setMode] = useState<'create' | 'update'>('create');

  const {
    terms,
    creationMutate,
    updationMutate,
    deletionMutate,
    isLoading,
    isProcessing,
  } = useTerms();

  const form = useForm<MyTerm>();
  const { setValue, getValues, reset } = form;

  const toast = useToast();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  let sortedTerms: MyTerm[] = [];
  if (terms) {
    sortedTerms = [...terms].sort((a, b) => a.english.localeCompare(b.english));
  }

  return (
    <>
      <Container mb="10">
        <Heading textAlign="center">내 용어집</Heading>
        <Box mt="5">
          <Button onClick={handleCreateButtonClick}>용어 생성</Button>
        </Box>
        <Box mt="5">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>영어</Th>
                  <Th>한국어</Th>
                  <Th textAlign="center">변경</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading ? (
                  <TableSkeletons />
                ) : (
                  sortedTerms.map((term) => {
                    return (
                      <Tr key={term.english}>
                        <Td
                          maxW="10rem"
                          overflow="hidden"
                          textOverflow="ellipsis"
                        >
                          {term.english}
                        </Td>
                        <Td
                          maxW="10rem"
                          overflow="hidden"
                          textOverflow="ellipsis"
                        >
                          {term.korean}
                        </Td>
                        <Td padding="0" textAlign="center">
                          <Button
                            size="sm"
                            onClick={() => handleModifyButtonClick(term)}
                          >
                            열기
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <TermFormDrawer
        form={form}
        isOpen={isDrawerOpen}
        isEnglishReadOnly={mode === 'create' ? false : true}
        headerText={createFormDrawerHeaderText()}
        buttons={createFormDrawerButtons()}
        onClose={onDrawerClose}
        onSubmit={onSubmit}
      />
    </>
  );

  function handleCreateButtonClick() {
    setMode('create');
    reset();
    onDrawerOpen();
  }
  function handleModifyButtonClick(term: MyTerm) {
    setMode('update');
    setValue('english', term.english);
    setValue('korean', term.korean);
    setValue('type', term.type);
    setValue('field', term.field);
    setValue('description', term.description);
    setValue('source', term.source);
    onDrawerOpen();
  }

  function onSubmit(data: MyTerm): unknown | Promise<unknown> {
    if (mode === 'create') {
      creationMutate(
        { term: data },
        {
          onSuccess: () => {
            onDrawerClose();
            toast({ title: '용어가 생성되었습니다.', status: 'success' });
          },
          onError: handleError,
        }
      );

      return;
    }

    updationMutate(
      { term: data },
      {
        onSuccess: () => {
          onDrawerClose();
          toast({ title: '용어가 갱신되었습니다.', status: 'success' });
        },
        onError: handleError,
      }
    );

    return;
  }
  function handleDeleteButtonClick() {
    deletionMutate(getValues('english'), {
      onSuccess: () => {
        onDrawerClose();
        toast({ title: '용어가 삭제되었습니다.', status: 'success' });
      },
      onError: handleError,
    });
  }

  function handleError(err: AxiosError<ErrorResponse>): void {
    toast({
      title: err.response?.data.message ?? '서버 오류가 발생했습니다.',
      status: 'error',
    });
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
