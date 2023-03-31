import { Box, Button, Heading, Textarea } from '@chakra-ui/react';

export default function Input() {
  return (
    <Box>
      <Heading as="h3" size="md">
        영어
      </Heading>
      <Box mt="3">
        <Textarea
          rows={10}
          placeholder="번역할 내용을 입력하세요."
          resize="none"
        />
      </Box>
      <Box mt="3">
        <Button>번역하기</Button>
      </Box>
    </Box>
  );
}
