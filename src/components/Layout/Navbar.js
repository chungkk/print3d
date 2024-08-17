"use client";
import Modal from '@/components/Modal';
import Link from 'next/link';
import React from 'react';
import {
  FaBars
} from "react-icons/fa";
import { GrClose } from "react-icons/gr";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const onToggleMenu = () => setIsOpen(!isOpen);
  return (
    <div className='bg-black h-20 pl-4 md:px-12 rounded-2xl text-white flex justify-between items-center'>
      <Link href='/' className='text-white text-xl font-bold'>Cee&apos;s BookShelves</Link>
      <div className='hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex flex-row text-white'>
        <Link href='/' className='text-white mr-7'>Books</Link>
        <Link href='/review' className='text-white mr-7'>Review</Link>
        <Link href='/' className='text-white mr-7'>Events</Link>
        <Link href='/' className='text-white mr-7'>About</Link>
        <Link href='/' className='text-white mr-7'>More</Link>
      </div>
      <FaBars
        className="h-6 w-6 mr-6 ml-auto block sm:block md:hidden lg:hidden xl:hidden 2xl:hidden "
        onClick={onToggleMenu}
      />

      <Modal
        position='right'
        className='h-screen w-3/4'
        open={isOpen}
        onClickOutSide={() => setIsOpen(false)}>
        <div className='w-full flex flex-col'>
          <div className="flex justify-between">
            <div className="font-bold text-2xl mb-8">DANH MỤC</div>
            <GrClose className="h-6 w-6 mr-2" onClick={onToggleMenu} />
          </div>
          <Link href='/' className='mr-7 text-blue-500'>Books</Link>
          <hr />
          <Link href='/review' className='mr-7 text-blue-500 mt-2'>Review</Link>
          <hr />
          <Link href='/' className='mr-7 text-blue-500 mt-2'>Events</Link>
          <hr />
          <Link href='/' className='mr-7 text-blue-500 mt-2'>About</Link>
          <hr />
          <Link href='/' className='mr-7 text-blue-500 mt-2'>More</Link>
          <hr />
        </div>
      </Modal>
    </div>
  );
}
