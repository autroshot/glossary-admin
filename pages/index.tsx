import { Container, Heading } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>홈 | 용어집 관리자</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Heading size="md">용어집 관리자에 오신 것을 환영합니다!</Heading>
      </Container>
    </>
  );
}
