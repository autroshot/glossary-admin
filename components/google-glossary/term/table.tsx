import { MyGoogleTerm } from '@/types/models';
import {
  Button,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export default function TermTable({
  terms,
  isLoading,
  onModifyButtonClick,
}: Props) {
  return (
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
            : terms.map((term) => {
                return (
                  <Tr key={term.english}>
                    <Td maxW="10rem" overflow="hidden" textOverflow="ellipsis">
                      {term.english}
                    </Td>
                    <Td maxW="10rem" overflow="hidden" textOverflow="ellipsis">
                      {term.korean}
                    </Td>
                    <Td padding="0" textAlign="center">
                      <Button
                        size="sm"
                        onClick={() => onModifyButtonClick(term)}
                      >
                        열기
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
        </Tbody>
      </Table>
    </TableContainer>
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

interface Props {
  terms: MyGoogleTerm[];
  isLoading: boolean;
  onModifyButtonClick: (term: MyGoogleTerm) => void;
}
