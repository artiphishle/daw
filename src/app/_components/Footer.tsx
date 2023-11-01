import { Flex } from '@/pfui';
import { GithubIcon, InstagramIcon } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  console.info('[Footer] server-side');
  return (
    <footer className=" bg-orange-300 p-4">
      <Flex>
        <Link href="https://github.com/artiphishle/daw">
          <GithubIcon />
        </Link>
        <Link href="https://instagram.com/artiphishle">
          <InstagramIcon />
        </Link>
      </Flex>
    </footer>
  );
}
