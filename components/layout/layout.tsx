import { ReactNode } from 'react';
import Navbar from './navbar';

export default function Layout({ children }: Props) {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>{children}</main>
    </>
  );
}

interface Props {
  children: ReactNode;
}
