import { getUserSession } from '@/server/lib/auth';
import {
  HomeIcon,
  type LucideIcon,
  PencilRulerIcon,
  SearchIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar } from '../avatar';
import { ModeToggle } from '../mode-toggle';
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

type NavLinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const NavLink = ({ href, label, icon: Icon }: NavLinkProps) => (
  <Link
    href={href}
    className="flex items-center gap-2 rounded-md px-3.5 py-1.5 font-medium text-muted-foreground duration-150 hover:bg-muted hover:text-foreground"
  >
    <Icon className="size-4" />
    {label}
  </Link>
);

const NavLinks = () => (
  <nav className="flex flex-1 items-center gap-2">
    <NavLink href="/" label="خانه" icon={HomeIcon} />
    <NavLink href="/search" label="جستجو" icon={SearchIcon} />
    <NavLink href="/about" label="درباره ما" icon={UserIcon} />
  </nav>
);

export function Header() {
  return (
    <header className="border-b bg-card p-4">
      <nav className="container mx-auto flex items-center justify-between gap-4">
        <Logo />
        <NavLinks />
        <ModeToggle />
        <CheckSigned />
      </nav>
    </header>
  );
}

const CheckSigned = async () => {
  const session = await getUserSession();
  return session ? (
    <Link href={'/dashboard'}>
      <Avatar src={session.image!} alt={session.name!} />
    </Link>
  ) : (
    <SignIn />
  );
};
