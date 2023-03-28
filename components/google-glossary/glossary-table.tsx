import { getGlossaries } from '@/components/google-glossary/fetchers';
import { Glossary } from '@/types/models';
import {
  Button,
  LinkBox,
  LinkOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import NextLink from 'next/link';
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
                  <LinkBox>
                    <LinkOverlay as={NextLink} href="/google-glossary/123">
                      <Button size="sm" tabIndex={-1}>
                        보기
                      </Button>
                    </LinkOverlay>
                  </LinkBox>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
