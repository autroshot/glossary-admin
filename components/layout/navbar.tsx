import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useColorMode,
} from '@chakra-ui/react';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex minWidth="max-content" alignItems="center" px="6" py="3" gap="2">
      <Box p="2">
        <Heading size="md">용어집 관리자</Heading>
      </Box>
      <Spacer />
      <IconButton
        aria-label="어두운 모드"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
    </Flex>
  );
}
