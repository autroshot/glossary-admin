import { Term } from '@/types/models';
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
import { SubmitHandler, useForm } from 'react-hook-form';

export default function TermFormDrawer({
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
  } = useForm<Term>();

  return (
    <Drawer size="lg" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{headerText}</DrawerHeader>

        <DrawerBody>
          <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
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
  onSubmit: SubmitHandler<Term>;
}
