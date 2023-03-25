import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>홈 | 용어집 관리자</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>홈페이지</div>
      </main>
    </>
  );
}
