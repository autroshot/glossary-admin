import { getGlossaries } from '@/components/google-glossary/glossary/fetchers';
import { MyGoogleGlossary } from '@/types/models';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ButtonLink from '../../button-link';

export default function GlossaryTable() {
  const [glossaries, setGlossaries] = useState<MyGoogleGlossary[]>([]);

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
              <Tr key={glossary.name}>
                <Td maxW="20rem" overflow="hidden" textOverflow="ellipsis">
                  {glossary.name}
                </Td>
                <Td padding="0" textAlign="center">
                  <ButtonLink
                    text="보기"
                    size="sm"
                    href={`/google-glossary/${glossary.name}`}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
