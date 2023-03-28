import { getGlossaries } from '@/components/google-glossary/fetchers';
import { Glossary } from '@/types/models';
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
import { useEffect, useState } from 'react';

export default function GlossaryTable() {
  const [glossaries, setGlossaries] = useState<Glossary[]>([]);

  useEffect(() => {
    getGlossaries().then((glossaries) => {
      setGlossaries(glossaries);
    });
  }, []);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>이름</Th>
            <Th textAlign="center">상세</Th>
          </Tr>
        </Thead>
        <Tbody>
          {glossaries.map((glossary) => {
            return (
              <Tr key={glossary.displayName}>
                <Td maxW="20rem" overflow="hidden" textOverflow="ellipsis">
                  {glossary.displayName}
                </Td>
                <Td padding="0" textAlign="center">
                  <Button size="sm">보기</Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
