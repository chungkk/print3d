"use client";
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import Navbar from "@/components/Layout/Navbar";
import { IoSettingsOutline } from "react-icons/io5";
import { BiSolidCloudDownload } from "react-icons/bi";
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { useDropzone } from 'react-dropzone';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { domToPng } from 'modern-screenshot';
import { useClientMediaQuery } from '@/hooks/useClientMediaQuery';

export default function ConfigModal({ isOpen, onClose, config, setConfig }) {

  const isMobile = useClientMediaQuery('(max-width: 600px)');

  const onChangeInput = (type) => (e) => {
    const newConfig = { ...config, [type]: type === 'hiddenBookTitle' ? !config?.hiddenBookTitle : e.target.value };
    setConfig(newConfig);
    !isMobile && localStorage.setItem('sachOiConfig', JSON.stringify(newConfig));
  };

  const onHandleSubmit = () => {
    onClose?.(false);
  };


  return (
    <Modal
      open={isOpen}
      className='w-11/12 sm:w-1/2 sm:m-h-[300px] rounded-md'
      onClose={() => onClose(false)}
      onClickOutSide={() => onClose(false)}>
      <div className='w-full'>
        <h2 className='font-bold text-xl'>Chỉnh sửa thông tin hiển thị</h2>

        <div className='mt-2'>
          <p>Chỉnh sửa tiêu đề:</p>
          <input value={config?.title || ''} onChange={onChangeInput('title')} placeholder='About you: Books' className='border border-grey w-full p-2 mt-2' placeholder='Nhập tiêu đề' />
        </div>
        <div className='mt-2'>
          <p>Chỉnh sửa tác giả:</p>
          <input value={config?.author || ''} onChange={onChangeInput('author')} className='border border-grey w-full p-2 mt-2' placeholder='Nhập tiêu đề' />
        </div>
        <div className='mt-2'>
          <input
            type="checkbox"
            value={config?.hiddenBookTitle || ''}
            name="uploadType"
            onChange={onChangeInput('hiddenBookTitle')}
            checked={config?.hiddenBookTitle} />
          <span className='ml-1 cursor-pointer' onClick={onChangeInput('hiddenBookTitle')}>Ẩn tiêu đề mô tả sách</span>
        </div>

        <div className='flex justify-end mt-2'>
          <Button name='Huỷ bỏ' onClick={() => onClose(false)} className='mr-4 bg-gray-400' />
          <Button name='Xong' onClick={onHandleSubmit} />
        </div>
      </div>
    </Modal>
  );
}
