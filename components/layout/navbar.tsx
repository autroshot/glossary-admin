import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Flex,
  Heading,
  IconButton,
  Link,
  Spacer,
  useColorMode,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex minWidth="max-content" alignItems="center" px="6" py="3" gap="2">
      <Link as={NextLink} href="/" m="2">
        <Heading size="md">용어집 관리자</Heading>
      </Link>
      <Link as={NextLink} href="/my-glossary" ms="3">
        내 용어집
      </Link>
      <Link as={NextLink} href="/google-glossary" ms="3">
        구글 용어집
      </Link>
      <Spacer />
      <IconButton
        aria-label="어두운 모드"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
    </Flex>
  );
}
