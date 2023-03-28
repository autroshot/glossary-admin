import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';

export default function TermFormDrawer({ isOpen, onClose }: Props) {
  return (
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
  );
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
