import {
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
import styles from './glossary-table.module.css';

export default function GlossaryTable() {
  return (
    <TableContainer>
      <Table variant="simple" maxW="100%" className={styles.table}>
        <TableCaption placement="top" fontSize="lg" fontWeight="bold">
          용어집 목록
        </TableCaption>
        <Thead>
          <Tr>
            <Th w="80%">이름</Th>
            <Th w="20%" textAlign="center">
              상세
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>my-glossary-1</Td>
            <Td padding="0" textAlign="center">
              <Button size="sm">보기</Button>
            </Td>
          </Tr>
          <Tr>
            <Td>my-glossary-2</Td>
            <Td padding="0" textAlign="center">
              <Button size="sm">보기</Button>
            </Td>
          </Tr>
          <Tr>
            <Td overflow="hidden" textOverflow="ellipsis">
              my-glossary-3my-glossary-3my-glossary-3my-glossary-3my-glossary-3my-glossary-3
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
