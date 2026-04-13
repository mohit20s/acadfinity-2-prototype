import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <GraduationCap className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold text-acad-blue-950 tracking-tight">
        Acadfinity
      </span>
    </Link>
  );
};