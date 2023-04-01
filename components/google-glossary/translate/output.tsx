import { Box, Button, Heading, Textarea, useToast } from '@chakra-ui/react';

export default function Output({ translatedText }: Props) {
  const toast = useToast();

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
        <Button onClick={handleClick}>복사하기</Button>
      </Box>
    </Box>
  );

  function handleClick() {
    if (translatedText.length === 0) return;

    navigator.clipboard.writeText(translatedText);

    toast({
      title: '번역된 내용이 복사되었습니다.',
      status: 'success',
    });
  }
}

interface Props {
  translatedText: string;
}
