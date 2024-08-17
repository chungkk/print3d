"use client";
import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const colors = [
  '#F7D0B6', '#FBEAB8',
  '#DEEFC8', '#CFF1D7',
  '#CAEFE8', '#BEEAFD',
  '#C9CEFB', '#DFC4F7',
  '#F4B5E2', '#F4B5B8',
  '#DEC8C8', '#DEC8C8'
];

const categories = [
  { id: 1, name: 'Tiểu thuyết', key: 'novel' },
  { id: 2, name: 'Nobel', key: 'nobel' },
  { id: 3, name: 'Goncourt', key: 'goncourt' },
  { id: 4, name: 'Kinh điển', key: 'classic' },
  { id: 5, name: 'Trinh thám', key: 'detective' },
  { id: 6, name: 'Triết học', key: 'philosophy' },
  { id: 7, name: 'Viễn tưởng', key: 'fantasy' },
  { id: 8, name: 'Y học', key: 'medical' },
  { id: 9, name: 'Self help', key: 'selfhelp' },
  { id: 10, name: 'Truyện ngắn', key: 'shortstory' },
  { id: 11, name: 'Thơ', key: 'poetry' },
  { id: 12, name: 'Khác', key: 'other' },
];


export default function Category() {
  const [cat, setCat] = useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (name) => () => {
    const params = new URLSearchParams(searchParams);
    // params.set('page', '1');
    if (!cat) {
      params.set('category', name);
      setCat(name);
    } else {
      params.delete('category');
      setCat('');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
      {categories?.map((category, idx) => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return (
          <div key={category.id}
            onClick={handleSearch(category.key)}
            className={`rounded-2xl p-2 w-26 text-center text-black cursor-pointer`} style={{ backgroundColor: colors?.[idx] }}>
            {category.name}
          </div>
        );
      })}
    </div>
  );

}
