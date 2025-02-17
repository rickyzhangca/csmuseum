import Image from 'next/image';

export const Logo = () => {
  return (
    <Image
      src="/logo.svg"
      alt="CS Museum Logo"
      width={89}
      height={11}
      priority
      className="h-5 w-auto"
    />
  );
};
