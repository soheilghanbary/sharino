'use client';
import { useLinkStore } from '@/store/link-store';
import Link from 'next/link';
import { Avatar } from '../avatar';

export function PreviewEditor() {
  const links = useLinkStore((state) => state.links);
  return (
    <section className="grid gap-4 rounded-lg border bg-card p-4">
      <Avatar
        alt=""
        className="mx-auto size-20"
        src={'https://avatars.githubusercontent.com/u/98669021?v=4'}
      />
      <div className="space-y-1 text-center">
        <h2 className="font-extrabold text-xl">سهیل قنبری</h2>
        <p className="font-medium text-muted-foreground text-sm/6">
          توسعه دهنده فول استک وب
        </p>
      </div>
      <div id="links" className="grid gap-2">
        {links.map((l) => (
          <Link
            key={l.id}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-full border bg-secondary px-4 py-2 text-center font-semibold text-sm duration-150 active:scale-90"
          >
            {l.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
