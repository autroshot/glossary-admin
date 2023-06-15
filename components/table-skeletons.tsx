import { Button, Skeleton, Td, Tr } from '@chakra-ui/react';
import { ReactNode } from 'react';

export default function TableSkeletons() {
  return <>{createSkeletons()}</>;

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
