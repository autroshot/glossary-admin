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

export default function GlossaryTable() {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>영어</Th>
            <Th>한국어</Th>
            <Th textAlign="center">양식</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td maxW="10rem" overflow="hidden" textOverflow="ellipsis">
              english
            </Td>
            <Td maxW="10rem" overflow="hidden" textOverflow="ellipsis">
              영어
            </Td>
            <Td padding="0" textAlign="center">
              <Button size="sm">열기</Button>
            </Td>
          </Tr>
          <Tr>
            <Td maxW="10rem" overflow="hidden" textOverflow="ellipsis">
              english
            </Td>
            <Td maxW="10rem" overflow="hidden" textOverflow="ellipsis">
              영어
            </Td>
            <Td padding="0" textAlign="center">
              <Button size="sm">열기</Button>
            </Td>
          </Tr>
          <Tr>
            <Td maxW="10rem" overflow="hidden" textOverflow="ellipsis">
              englishenglishenglishenglishenglishenglishenglish
            </Td>
            <Td maxW="10rem" overflow="hidden" textOverflow="ellipsis">
              영어영어영어영어영어영어영어영어영어영어영어영어영어영어
            </Td>
            <Td padding="0" textAlign="center">
              <Button size="sm">열기</Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
