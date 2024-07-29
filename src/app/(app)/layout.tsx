import { DashboardNav } from '@/components/shared/dashboard-nav';
import type { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <DashboardNav />
      {children}
    </main>
  );
}
