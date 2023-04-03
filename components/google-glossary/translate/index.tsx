import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { translate } from './fetchers';
import Input from './input';
import Output from './output';

export default function Translate({ glossaryId }: Props) {
  const [translatedText, setTranslatedText] = useState('');

  const form = useForm<Inputs>();

  return (
    <Container maxW="container.md" mb="10">
      <Heading textAlign="center">번역하기</Heading>
      <Box mt="5">
        <SimpleGrid columns={2} spacing="5">
          <Input form={form} onSubmit={onSubmit} />
          <Output translatedText={translatedText} />
        </SimpleGrid>
      </Box>
    </Container>
  );

  function onSubmit(data: Inputs): unknown | Promise<unknown> {
    translate(glossaryId, data.english).then((translatedText) => {
      setTranslatedText(translatedText);
    });
    return;
  }
}

export interface Inputs {
  english: string;
}

interface Props {
  glossaryId: string;
}
