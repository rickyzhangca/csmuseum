'use client';

import { cities } from '@/content';
import { useRouter } from 'next/navigation';
import { Button } from '../button';

export const LuckyButton = () => {
  const router = useRouter();

  const handleRandomCity = () => {
    const now = new Date();
    const timestamp = now.getTime();
    const randomIndex = timestamp % cities.length;
    const randomCity = cities[randomIndex];

    if (randomCity) {
      router.push(`/cities/${randomCity.slug}`);
    }
  };

  return <Button onClick={handleRandomCity}>I&apos;m feeling lucky</Button>;
};
