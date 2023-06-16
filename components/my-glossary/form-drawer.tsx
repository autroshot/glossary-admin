import { MyTerm } from '@/types/models';
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
  isEnglishReadOnly,
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
              <FormControl
                isInvalid={Boolean(errors.english)}
                isReadOnly={isEnglishReadOnly}
              >
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
              <FormControl>
                <FormLabel>유형</FormLabel>
                <Input {...register('type')} />
              </FormControl>
              <FormControl>
                <FormLabel>분야</FormLabel>
                <Input {...register('field')} />
              </FormControl>
              <FormControl>
                <FormLabel>설명</FormLabel>
                <Input {...register('description')} />
              </FormControl>
              <FormControl>
                <FormLabel>출처</FormLabel>
                <Input {...register('source')} />
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
  form: UseFormReturn<MyTerm>;
  isOpen: boolean;
  isEnglishReadOnly: boolean;
  headerText: string;
  buttons: ReactNode;
  onClose: () => void;
  onSubmit: SubmitHandler<MyTerm>;
}
