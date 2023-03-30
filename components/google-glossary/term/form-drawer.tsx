import { MyGoogleTerm } from '@/types/models';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

export default function TermFormDrawer({
  form,
  isOpen,
  headerText,
  buttons,
  onClose,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <Drawer size="lg" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{headerText}</DrawerHeader>

        <DrawerBody>
          <form id="drawer-form" onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <FormControl isInvalid={Boolean(errors.english)}>
                <FormLabel>영어</FormLabel>
                <Input
                  {...register('english', { required: '필숫값입니다.' })}
                />
                {Boolean(errors.english) ? (
                  <FormErrorMessage>{errors.english?.message}</FormErrorMessage>
                ) : null}
              </FormControl>
              <FormControl isInvalid={Boolean(errors.korean)}>
                <FormLabel>한국어</FormLabel>
                <Input {...register('korean', { required: '필숫값입니다.' })} />
                {Boolean(errors.korean) ? (
                  <FormErrorMessage>{errors.korean?.message}</FormErrorMessage>
                ) : null}
              </FormControl>
              <Input type="hidden" {...register('id')} />
            </VStack>
          </form>
        </DrawerBody>

        <DrawerFooter>{buttons}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface Props {
  form: UseFormReturn<MyGoogleTerm>;
  isOpen: boolean;
  headerText: string;
  buttons: ReactNode;
  onClose: () => void;
  onSubmit: SubmitHandler<MyGoogleTerm>;
}
