import { MyTerm } from '@/controllers/my-glossary/types';
import {
  Box,
  Button,
  Container,
  Heading,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { getTerms } from './fetchers';

export default function Glossary() {
  const { data: terms, isLoading } = useQuery<MyTerm[]>({
    queryKey: ['my', 'glossary'],
    queryFn: () => {
      return getTerms();
    },
  });

  let sortedTerms: MyTerm[] = [];
  if (terms) {
    sortedTerms = [...terms].sort((a, b) => a.english.localeCompare(b.english));
  }

  return (
    <Container mb="10">
      <Heading textAlign="center">내 용어집</Heading>
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
              {isLoading
                ? createSkeletons()
                : sortedTerms.map((term) => {
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
                          <Button size="sm">열기</Button>
                        </Td>
                      </Tr>
                    );
                  })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );

  function createSkeletons(): ReactNode[] {
    const result: ReactNode[] = [];
    const LENGTH = 10;

    for (let i = 0; i < LENGTH; i++) {
      result.push(
        <Tr key={i}>
          <Td maxW="10rem" overflow="hidden" textOverflow="ellipsis">
            <Skeleton>loadingloadingloading</Skeleton>
          </Td>
          <Td maxW="10rem" overflow="hidden" textOverflow="ellipsis">
            <Skeleton>로딩로딩로딩로딩로딩로딩</Skeleton>
          </Td>
          <Td padding="0" textAlign="center">
            <Button size="sm" isLoading>
              열기
            </Button>
          </Td>
        </Tr>
      );
    }

    return result;
  }
}
