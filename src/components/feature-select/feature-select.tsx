'use client';

import { CategoryDisplayNames, Feature, FeatureCategory } from '@/types';
import { tw } from '@/utils';
import { Listbox, ListboxButton, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export type FeatureWithCount = {
  id: Feature;
  name: string;
  count: number;
  category: FeatureCategory;
};

type FeatureGroup = {
  name: string;
  features: FeatureWithCount[];
};

type Props = {
  features: FeatureWithCount[];
};

const categorizeFeatures = (features: FeatureWithCount[]): FeatureGroup[] => {
  const groupedFeatures = features.reduce<
    Record<FeatureCategory, FeatureWithCount[]>
  >(
    (acc, feature) => {
      const category = feature.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(feature);
      return acc;
    },
    {} as Record<FeatureCategory, FeatureWithCount[]>
  );

  return Object.entries(CategoryDisplayNames)
    .filter(([key]) => groupedFeatures[key as FeatureCategory]?.length > 0)
    .map(([key, name]) => ({
      name,
      features: groupedFeatures[key as FeatureCategory] || [],
    }));
};

export const FeatureSelect = ({ features }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedFeatures = (searchParams.get('features')?.split(',') ||
    []) as Feature[];

  const selected = features.filter(f => selectedFeatures.includes(f.id));
  const featureGroups = categorizeFeatures(features);

  const updateFeatures = (newSelected: FeatureWithCount[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSelected.length > 0) {
      params.set('features', newSelected.map(f => f.id).join(','));
    } else {
      params.delete('features');
    }
    params.set('tab', 'features');
    router.push(`/cities?${params.toString()}`);
  };

  return (
    <Listbox multiple value={selected} onChange={updateFeatures}>
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
            updateFeatures([]);
          }}
        />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        modal={false}
        transition
        className={tw(
          'relative z-50 mt-2 flex max-h-96 flex-col gap-2 overflow-auto rounded-xl border border-gray-200 bg-white p-2 shadow-2xl',
          'transition duration-75 ease-in data-[leave]:data-[closed]:opacity-0'
        )}
      >
        {featureGroups.map(group => (
          <div key={group.name}>
            <div className="mb-1 rounded-lg px-1 text-sm font-medium text-gray-400">
              {group.name}
            </div>
            <div className="flex flex-col gap-0.5">
              {group.features.map(feature => (
                <button
                  key={feature.id}
                  onClick={() => {
                    const newSelected = selected.includes(feature)
                      ? selected.filter(f => f.id !== feature.id)
                      : [...selected, feature];
                    updateFeatures(newSelected);
                  }}
                  className={tw(
                    'group flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-transparent px-3 py-1.5 transition duration-75 select-none',
                    selected.includes(feature)
                      ? 'bg-blue-100 text-blue-600 hover:border-blue-600/50'
                      : 'hover:border-gray-200 hover:bg-gray-100'
                  )}
                >
                  <span>{feature.name}</span>
                  <span
                    className={tw(
                      'text-sm',
                      selected.includes(feature)
                        ? 'text-blue-500'
                        : 'text-gray-400'
                    )}
                  >
                    {feature.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
