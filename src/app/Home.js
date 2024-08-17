import React from 'react';
import { CiSearch } from "react-icons/ci";
import { fetchBooks } from '@/lib/data';
import Search from '@/components/Search/Search';
import Category from '@/components/Category';


export default async function Home({ searchParams }) {
  const query = searchParams?.query || '';
  const category = searchParams?.category || '';
  // const currentPage = Number(searchParams?.page) || 1;
  const totalBooks = await fetchBooks({ category, query });
  return (
    <div>
      <div className='px-20'>
        {/* Search */}
        <Search />
        {/* Categories */}
        <Category />
      </div>
      {/* Books */}
      <div className='p-22 mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {totalBooks?.map(book => {
          return (
            <div key={book.id} className='flex flex-col items-center w-50 h-72 bg-white rounded-lg shadow-md p-4'>
              <img src={book.cover} alt={book.title} className='w-45 h-36 object-cover' />
              <div className='flex flex-col items-center justify-center'>
                <h3 className='text-md font-bold overflow-hidden line-clamp-2 mt-1'>{book.title}</h3>
                <p className='text-sm text-gray-500'>{book.author}</p>
                <p className='text-sm text-gray-500'>{book.category}</p>
                <p className='text-sm text-gray-500'>${book.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
