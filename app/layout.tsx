'use client';

import { UserProvider } from '@/context/UserContext';
import Sidebar from '@/components/sidebar';
import './globals.css';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/' || pathname === '/login';

  return (
    <html lang="en">
      <body>
        <UserProvider>
          <div className="flex h-screen">
            {!isLoginPage && <Sidebar />}
            <div className={clsx("flex-1", !isLoginPage && "ml-48")}>
              {children}
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
