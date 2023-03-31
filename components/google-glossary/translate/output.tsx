import { Box, Button, Heading, Textarea } from '@chakra-ui/react';

export default function Output({ translatedText }: Props) {
  return (
    <Box>
      <Heading as="h3" size="md">
        한국어
      </Heading>
      <Box mt="3">
        <Textarea
          rows={10}
          placeholder="번역된 내용이 이곳에 출력됩니다."
          resize="none"
          readOnly
          value={translatedText}
        />
      </Box>
      <Box mt="3">
        <Button>복사하기</Button>
      </Box>
    </Box>
  );
}

interface Props {
  translatedText: string;
}
