import { getGlossaries } from '@/components/google-glossary/glossary/fetchers';
import { MyGoogleGlossary } from '@/types/models';
import {
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ButtonLink from '../../button-link';

export default function Table() {
  const [glossaries, setGlossaries] = useState<MyGoogleGlossary[]>([]);

  useEffect(() => {
    getGlossaries().then((glossaries) => {
      setGlossaries(glossaries);
    });
  }, []);

  return (
    <TableContainer>
      <ChakraTable variant="simple">
        <Thead>
          <Tr>
            <Th>이름</Th>
            <Th textAlign="center">상세</Th>
          </Tr>
        </Thead>
        <Tbody>
          {glossaries.map((glossary) => {
            return (
              <Tr key={glossary.id}>
                <Td maxW="20rem" overflow="hidden" textOverflow="ellipsis">
                  {glossary.id}
                </Td>
                <Td padding="0" textAlign="center">
                  <ButtonLink
                    text="보기"
                    size="sm"
                    href={`/google-glossary/${glossary.id}`}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
}
