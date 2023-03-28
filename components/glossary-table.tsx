import {
  Box,
  Button,
  Table,
  TableCaption,
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
        <TableCaption placement="top" fontSize="lg" fontWeight="bold">
          용어집 목록
        </TableCaption>
        <Thead>
          <Tr>
            <Th>이름</Th>
            <Th textAlign="center">상세</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td maxW="20rem" overflow="hidden" textOverflow="ellipsis">
              my-glossary-1
            </Td>
            <Td padding="0" textAlign="center">
              <Button size="sm">보기</Button>
            </Td>
          </Tr>
          <Tr>
            <Td maxW="20rem" overflow="hidden" textOverflow="ellipsis">
              my-glossary-2
            </Td>
            <Td padding="0" textAlign="center">
              <Button size="sm">보기</Button>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Box maxW="20rem" overflow="hidden" textOverflow="ellipsis">
                my-glossary-3
              </Box>
            </Td>
            <Td padding="0" textAlign="center">
              <Button size="sm">보기</Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
