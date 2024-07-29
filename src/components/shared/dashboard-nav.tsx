'use client';
import { cn } from '@/lib/utils';
import { ChartPie, EditIcon, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const NavLink = ({ href, label, icon: Icon }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 rounded-full px-3.5 py-1.5 font-medium text-muted-foreground duration-150 hover:text-foreground',
        {
          'bg-primary text-primary-foreground hover:text-primary-foreground':
            isActive,
        },
      )}
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
};

export function DashboardNav() {
  return (
    <nav className="mx-auto flex w-fit items-center gap-2 rounded-full border bg-card p-1">
      <NavLink href="/dashboard" label="داشبورد" icon={ChartPie} />
      <NavLink href="/editor" label="ویرایشگر" icon={EditIcon} />
    </nav>
  );
}
