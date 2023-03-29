import {
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
import { ReactNode } from 'react';

export default function TermFormDrawer({
  isOpen,
  headerText,
  buttons,
  onClose,
}: Props) {
  return (
    <Drawer size="lg" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{headerText}</DrawerHeader>

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

        <DrawerFooter>{buttons}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface Props {
  isOpen: boolean;
  headerText: string;
  buttons: ReactNode;
  onClose: () => void;
}
