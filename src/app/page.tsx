'use client';

import { LoginButton } from '@/features/auth/components/LoginButton';
import { ThemeToggle } from '@/features/common/components/ThemeToggle';

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoginButton />
      <ThemeToggle />
    </div>
  );
}
