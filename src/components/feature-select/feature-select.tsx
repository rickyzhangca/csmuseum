'use client';

import { tw } from '@/utils';
import { Listbox, ListboxButton, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

const people = [
  { id: 1, name: 'Tom Cook' },
  { id: 2, name: 'Wade Cooper' },
  { id: 3, name: 'Tanya Fox' },
  { id: 4, name: 'Arlene Mccoy' },
  { id: 5, name: 'Devon Webb' },
];

export const FeatureSelect = () => {
  const [selected, setSelected] = useState([people[1]]);

  return (
    <Listbox multiple value={selected} onChange={setSelected}>
      <ListboxButton className="flex items-center justify-center gap-2 rounded-full border border-gray-200 py-1.5 pr-3 pl-5">
        {selected.length === 0 ? (
          <span>All features</span>
        ) : selected.length === 1 ? (
          selected[0].name
        ) : (
          `${selected.length} features selected`
        )}
        <ChevronDownIcon
          className="group pointer-events-none size-4 min-w-4 opacity-50"
          aria-hidden="true"
        />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className={tw(
          'relative mt-2 flex flex-col rounded-xl border border-gray-200 bg-white p-2 shadow-2xl',
          'gap-0.5 transition duration-75 ease-in data-[leave]:data-[closed]:opacity-0'
        )}
      >
        {people.map(person => (
          <button
            key={person.name}
            onClick={() => {
              const newSelected = selected.includes(person)
                ? selected.filter(p => p.id !== person.id)
                : [...selected, person];
              setSelected(newSelected);
            }}
            className={tw(
              'group flex w-full cursor-default items-center gap-2 rounded-lg border border-transparent px-3 py-1.5 transition duration-75 select-none',
              selected.includes(person)
                ? 'bg-blue-100 text-blue-600 hover:border-blue-600/50'
                : 'hover:border-gray-200 hover:bg-gray-100'
            )}
          >
            {person.name}
          </button>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
