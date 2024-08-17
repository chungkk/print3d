"use client";
import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    const term = e.target.value;
    // params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className='relative my-10'>
      <input
        onChange={handleSearch}
        defaultValue={searchParams.get('query')?.toString()}
        className='h-12 rounded-lg pl-4 pr-12 w-full text-base'
        placeholder='Search books' />
      <CiSearch className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 right-1 text-2xl' />
    </div>
  );

}
