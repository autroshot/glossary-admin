import { Box, Button, Heading, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export default function Input() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

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

  function onSubmit(data: Inputs): unknown | Promise<unknown> {
    console.log(data);
    return;
  }

  interface Inputs {
    english: string;
  }
}
