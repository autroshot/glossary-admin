import TableSkeletons from '@/components/table-skeletons';
import { MyGoogleTerm } from '@/types/models';
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

interface Props {
  terms: MyGoogleTerm[];
  isLoading: boolean;
  onModifyButtonClick: (term: MyGoogleTerm) => void;
}
