import { Box, Button, Heading, Textarea } from '@chakra-ui/react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Inputs } from './types';

export default function Input({ form, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <Box>
      <Heading as="h3" size="md">
        영어
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mt="3">
          <Textarea
            {...register('english', { required: true })}
            isInvalid={Boolean(errors.english?.message)}
            rows={10}
            placeholder="번역할 내용을 입력하세요."
            resize="none"
          />
        </Box>
        <Box mt="3">
          <Button type="submit">번역하기</Button>
        </Box>
      </form>
    </Box>
  );
}

interface Props {
  form: UseFormReturn<Inputs>;
  onSubmit: SubmitHandler<Inputs>;
}
