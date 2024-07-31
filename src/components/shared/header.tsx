import { getUserSession } from '@/server/lib/auth';
import { EditIcon, PencilRulerIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { SignIn } from './sign-in-modal';

const Logo = () => (
  <Link
    href={'/'}
    className="flex items-center gap-2 font-extrabold text-lg text-primary"
  >
    <PencilRulerIcon className="size-5" />
    شرینو
  </Link>
);

export function Header() {
  return (
    <header className="border-b bg-card p-4">
      <nav className="container mx-auto flex items-center justify-between gap-4">
        <Logo />
        <CheckSigned />
      </nav>
    </header>
  );
}

const CheckSigned = async () => {
  const session = await getUserSession();
  return session ? (
    <Button asChild>
      <Link href={'/editor'}>
        <EditIcon className="ml-2 size-4" />
        ویژوال
      </Link>
    </Button>
  ) : (
    <SignIn />
  );
};
