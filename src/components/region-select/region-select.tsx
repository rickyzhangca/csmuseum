'use client';

import { Region } from '@/types';
import { tw, withBunnyRegion } from '@/utils';
import { Listbox, ListboxButton, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

type RegionWithCount = {
  id: Region;
  name: string;
  count: number;
};

type Props = {
  regions: RegionWithCount[];
};

export const RegionSelect = ({ regions }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedRegions = (searchParams.get('regions')?.split(',') ||
    []) as Region[];

  const selected = regions.filter(r => selectedRegions.includes(r.id));

  const updateRegions = (newSelected: RegionWithCount[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSelected.length > 0) {
      params.set('regions', newSelected.map(r => r.id).join(','));
    } else {
      params.delete('regions');
    }
    params.set('tab', 'features');
    router.push(`/cities?${params.toString()}`);
  };

  return (
    <Listbox multiple value={selected} onChange={updateRegions}>
      <ListboxButton className="bg-background flex items-center justify-center gap-1 rounded-full border border-gray-200 py-1.5 pr-2 pl-3 hover:cursor-pointer sm:gap-2 sm:pr-3 sm:pl-5">
        {selected.length === 0 ? (
          <span>Any</span>
        ) : selected.length === 1 ? (
          selected[0].name
        ) : (
          `${selected.length} selected`
        )}
        <ChevronDownIcon
          className="group pointer-events-none size-4 min-w-4 opacity-50"
          aria-hidden="true"
        />
        <XIcon
          className={tw(
            'size-4 min-w-4 opacity-50',
            selected.length === 0 && 'hidden'
          )}
          onClick={e => {
            e.stopPropagation();
            updateRegions([]);
          }}
        />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        modal={false}
        transition
        className={tw(
          'relative z-50 mt-2 flex flex-wrap gap-0.5 rounded-xl border border-gray-200 bg-white p-2 shadow-2xl',
          'transition duration-75 ease-in data-[leave]:data-[closed]:opacity-0'
        )}
      >
        {regions.map(region => (
          <button
            key={region.id}
            onClick={() => {
              const newSelected = selected.includes(region)
                ? selected.filter(r => r.id !== region.id)
                : [...selected, region];
              updateRegions(newSelected);
            }}
            className={tw(
              'group flex w-full cursor-pointer flex-col items-center justify-between gap-2 rounded-lg border border-transparent p-2 transition select-none',
              selected.includes(region)
                ? 'bg-blue-100 text-blue-600 hover:border-blue-600/20'
                : 'hover:border-gray-200 hover:bg-gray-100'
            )}
          >
            <Image
              src={withBunnyRegion(region.id)}
              alt={region.name}
              width={100}
              height={100}
              className={tw(
                'rounded-lg border bg-gradient-to-b from-gray-50 to-gray-200 opacity-90',
                selected.includes(region)
                  ? 'border-blue-600'
                  : 'border-gray-300'
              )}
            />
            <p className="flex flex-col">
              <span className="font-medium">{region.name}</span>
              <span
                className={tw(
                  'text-sm font-medium',
                  selected.includes(region) ? 'text-blue-600' : 'text-gray-400'
                )}
              >
                {region.count}
              </span>
            </p>
          </button>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
