import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="relative group flex items-center shrink-0">
      {/* 
        This uses your actual local logo file.
        Adjust the 'h-10' (height) to make it larger or smaller as needed.
      */}
      <img 
        src="/images/logo.png" 
        alt="Acadfinity" 
        className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
      />
    </Link>
  );
}