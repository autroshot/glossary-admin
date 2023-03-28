import { Button, LinkBox, LinkOverlay, ThemingProps } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function ButtonLink({ text, size, href }: Props) {
  return (
    <LinkBox>
      <LinkOverlay as={NextLink} href={href}>
        <Button size={size} tabIndex={-1}>
          {text}
        </Button>
      </LinkOverlay>
    </LinkBox>
  );
}

interface Props {
  text: string;
  size: ThemingProps<'Button'>['size'];
  href: string;
}
