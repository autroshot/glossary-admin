import TermTable from '@/components/google-glossary/term-table';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function GoogleGlossaryDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const displayName = router.query['display-name'];

  return (
    <>
      <Container>
        <Heading textAlign="center">구글 용어집 상세</Heading>
        <Box>{displayName}</Box>
        <Button onClick={onOpen}>양식 열기</Button>
        <Box mt="5">
          <TermTable />
        </Box>
      </Container>
      <Drawer size="lg" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>용어 양식</DrawerHeader>

          <DrawerBody>
            <form
              id="my-form"
              onSubmit={(e) => {
                e.preventDefault();
                console.log('submitted');
              }}
            >
              <VStack>
                <FormControl>
                  <FormLabel>영어</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>한국어</FormLabel>
                  <Input type="text" />
                </FormControl>
              </VStack>
            </form>
          </DrawerBody>

          <DrawerFooter>
            <ButtonGroup>
              <Button colorScheme="red">삭제</Button>
              <Button type="submit" form="my-form">
                수정
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
