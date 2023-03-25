import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export default function Layout({ children }: Props) {
  return (
    <>
      <nav>
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box p="2">
            <Heading size="md">Chakra App</Heading>
          </Box>
          <Spacer />
          <ButtonGroup gap="2">
            <Button colorScheme="teal">Sign Up</Button>
            <Button colorScheme="teal">Log in</Button>
          </ButtonGroup>
        </Flex>
      </nav>
      <main>{children}</main>
    </>
  );
}

interface Props {
  children: ReactNode;
}
