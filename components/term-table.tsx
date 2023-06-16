import TableSkeletons from '@/components/table-skeletons';
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export default function TermTable<T extends CommonTerm>({
  terms,
  isLoading,
  onModifyButtonClick,
}: Props<T>) {
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
          {isLoading ? (
            <TableSkeletons />
          ) : (
            terms.map((term) => {
              return (
                <Tr key={term.english}>
                  <Td maxW="10rem" overflow="hidden" textOverflow="ellipsis">
                    {term.english}
                  </Td>
                  <Td maxW="10rem" overflow="hidden" textOverflow="ellipsis">
                    {term.korean}
                  </Td>
                  <Td padding="0" textAlign="center">
                    <Button size="sm" onClick={() => onModifyButtonClick(term)}>
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
  );
}

interface Props<T> {
  terms: T[];
  isLoading: boolean;
  onModifyButtonClick: (term: T) => void;
}

interface CommonTerm {
  english: string;
  korean: string;
}
