"use client";
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Navbar from "@/components/Layout/Navbar";
import { IoSettingsOutline } from "react-icons/io5";
import { BiSolidCloudDownload } from "react-icons/bi";
import { FaFilePen } from "react-icons/fa6";
import { MdCloudUpload } from "react-icons/md";
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { useDropzone } from 'react-dropzone';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { domToPng } from 'modern-screenshot';
import { useClientMediaQuery } from '@/hooks/useClientMediaQuery';
import ConfigModal from './ConfigModal';
import { bookInit } from './Const';


const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 4,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};


export default function Page() {
  const [books, setBooks] = useState(bookInit);
  const [openBook, setOpenBook] = useState();
  const [urlBook, setUrlBook] = useState();
  const [uploadType, setUploadType] = useState('link');
  const [tempCover, setTempCover] = useState();
  const [isModalConfig, setIsModalConfig] = useState(false);
  const [config, setConfig] = useState({ title: 'About you: Books', author: '@Your Name', hiddenBookTitle: false });
  const [isEdit, setIsEdit] = useState(false);
  const [isExport, setIsExport] = useState(false);

  const isMobile = useClientMediaQuery('(max-width: 600px)');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const bookLocal = localStorage.getItem("sachOiBooks") || [];
      const configLocal = localStorage.getItem("sachOiConfig");
      bookLocal?.length && setBooks(JSON.parse(bookLocal));
      configLocal && setConfig(JSON.parse(configLocal));
    }
  }, []);

  useEffect(() => {
    if (isExport) {
      const capture = document.getElementById('capture');
      domToPng(capture).then(dataUrl => {
        const link = document.createElement('a');
        link.download = `sachoi.com-${config?.author?.replace(/[^a-zA-Z0-9]/g, '')}.png`;
        link.href = dataUrl;
        link.click();
      });
      setIsExport(false);
    }
  }, [isExport]);


  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]; // Chỉ lấy file đầu tiên
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;
      setTempCover(base64); // Cập nhật state với base64 của file
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, acceptedFiles, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'image/*': []
    },
    // validator: validateFile,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );


  const onExport = () => {
    // const capture = document.getElementById('capture');
    // domToPng(capture).then(dataUrl => {
    //   const link = document.createElement('a');
    //   link.download = `sachoi.com-${author?.replace(/[^a-zA-Z0-9]/g, '')}.png`;
    //   link.href = dataUrl;
    //   link.click();
    // });
    setIsEdit(false);
    setIsExport(true);
  };

  const onChangeUrlPath = (e) => {
    setUrlBook(e.target.value);
  };

  const onSelectUploadType = (type) => () => setUploadType(type);

  const onAddBook = async () => {
    if (uploadType === 'link') {
      if (!urlBook || !openBook.title) return;

      try {
        let cv = '';
        if (urlBook.includes('goodreads') || urlBook.includes('tiki')) {
          const rs = await axios.get("api/review", {
            params: {
              url: urlBook
            }
          });
          cv = rs.data.url;
        } else {
          cv = urlBook;
        }
        const addCoverToBook = books?.map(book => {
          if (book.id === openBook.id) {
            return { ...book, cover: cv, title: openBook.title };
          }
          return book;
        });
        setBooks(addCoverToBook);
        !isMobile && localStorage.setItem('sachOiBooks', JSON.stringify(addCoverToBook));
        setOpenBook(null);
        setUrlBook('');
      } catch (error) {
        console.log("=====>>>>> onAddBook error: " + error);
        alert(JSON.stringify(error));
      }
    } else {
      if (!tempCover || !openBook.title) return;
      const addCoverToBook = books?.map(book => {
        if (book.id === openBook.id) {
          return { ...book, cover: tempCover, title: openBook.title };
        }
        return book;
      });
      setBooks(addCoverToBook);
      !isMobile && localStorage.setItem('sachOiBooks', JSON.stringify(addCoverToBook));
      setOpenBook(null);
      setTempCover('');
    }
  };

  const onOpenAddBook = (book) => () => {
    setOpenBook(book);
    setUrlBook('');
  };

  const onChangeTitle = (ev) => setOpenBook(prev => ({ ...prev, title: ev.target.value }));


  return (
    <section className="px-4 md:px-6 py-6">
      <main className="flex flex-col justify-between">
        <Navbar />
        <div className='md:px-10'>
          <div className='my-4 md:px-4 flex flex-row items-end justify-between'>
            <div onClick={() => setIsModalConfig(true)} className='border flex flex-row items-center rounded-md p-3 bg-red-500  cursor-pointer'>
              <div className='font-bold text-white'>Config</div>
              <IoSettingsOutline className='ml-2 text-2xl text-white' />
            </div>
            <div onClick={onExport} className='border flex flex-row items-center rounded-md p-3 bg-red-500  cursor-pointer'>
              <div className='font-bold text-white'>Export</div>
              <BiSolidCloudDownload className='ml-2 text-2xl text-white' />
            </div>
          </div>
          {!isMobile && <div className='text-green-500'>Tip: bạn có thể phóng to, thu nhỏ hoặc kéo ảnh cho vừa với khung bên ngoài</div>}
          <div id='capture' className='bg-[#FDF2E4] md:p-2'>
            <div className='mt-1 mr-2 sm:mt-1 sm:mr-1 text-right font-serif font-light text-[7px] md:text-base text-[#7B7754]'>Created by: SachOi.com/review</div>
            <div className='text-center font-serif font-bold text-3xl md:text-4xl xl:text-6xl text-[#7B7754]'>{config?.title}</div>
            <div className='text-right font-serif font-bold text-[10px] sm:text-2xl mb-2 sm:mb-3 text-[#7B7754] mr-12 sm:mr-20'>{config?.author}</div>
            <div className='p-22 sm:mt-10 grid grid-cols-6 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 gap-0'>
              {books?.map(book => {
                return (
                  <div key={book.id} className='relative flex flex-col items-center mb-2 sm:min-h-40 rounded-lg sm:p-1 cursor-pointer'>
                    {isEdit?.id === book?.id && <div
                      onClick={onOpenAddBook(book)}
                      className='flex items-center text-white bg-teal-500 rounded-sm p-1 absolute -top-7 left-0 z-0 sm:p-1 md:left-6'>
                      Upload<MdCloudUpload className='ml-1' />
                    </div>}
                    <div onClick={!book?.cover ? onOpenAddBook(book) : () => setIsEdit(book)} className='w-[50px] h-[70px] sm:w-20 sm:h-32 md:w-24 md:h-40 xl:w-44 xl:h-56 bg-gray-300 border-[1px] border-black overflow-hidden'>
                      <TransformWrapper>
                        <TransformComponent>
                          {book?.cover &&
                            <img src={book?.cover}
                              alt={book.title}
                              className='w-[50px] h-[70px] sm:w-20 sm:h-32  md:w-24 md:h-40 xl:w-44 xl:h-56 object-cover' />
                          }
                        </TransformComponent>
                      </TransformWrapper>
                    </div>
                    {!config?.hiddenBookTitle && <div onClick={onOpenAddBook(book)} className='flex flex-col items-center justify-center sm:mt-2'>
                      <h3 className='text-[8px] sm:text-xl md:text-xl xl:text-3xl text-center font-bold overflow-hidden line-clamp-3 mt-1 text-[#7B7754]'>{book.title}</h3>
                    </div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <ConfigModal isOpen={isModalConfig} onClose={setIsModalConfig} config={config} setConfig={setConfig} />

        <Modal
          open={openBook}
          className='w-11/12 sm:w-1/2 sm:m-h-[300px] rounded-md'
          onClose={() => setOpenBook(false)}
          onClickOutSide={() => setOpenBook(false)}>
          <div className='w-full'>
            <h2 className='font-bold text-xl'>Thêm Sách</h2>
            <div className='flex flex-row justify-between'>
              <div>
                <div className='mt-2'>Chọn nguồn ảnh:</div>
                <div>
                  <div onClick={onSelectUploadType('link')} className='cursor-pointer'>
                    <input type="radio" value="link" name="uploadType" onChange={() => onSelectUploadType('link')} checked={uploadType === 'link'} />
                    <span className='ml-1'>Chọn ảnh từ link (goodreads.com hoặc tiki.com hoặc link ảnh )</span>
                  </div>
                  <div onClick={onSelectUploadType('device')} className='cursor-pointer'>
                    <input type="radio" value="device" name="uploadType" onChange={() => onSelectUploadType('device')} checked={uploadType === 'device'} />
                    <span className='ml-1'>Tải lên từ thiết bị</span>
                  </div>
                </div>
                {/* <p className='mt-2'>Bạn hãy lấy link từ goodreads.com hoặc tiki.com rồi paste vào ô dưới:</p> */}
              </div>
              {tempCover && <img src={tempCover}
                alt={'Book cover'}
                className='w-[80px] h-[140px] sm:w-20 sm:h-28 object-cover sm:mr-4 ' />}
            </div>

            <div>
              {uploadType === 'link' ?
                (
                  <div>
                    <p className='mt-2'>Bạn hãy lấy link từ goodreads.com hoặc tiki.com rồi paste vào ô dưới:</p>
                    <textarea value={urlBook} onChange={onChangeUrlPath} className='border border-grey w-full p-2' />
                  </div>
                )
                : (
                  <div className='mt-2'>
                    <div {...getRootProps({ style })}>
                      <input {...getInputProps()} />
                      <p>Kéo rồi thả ảnh vào đây, hoặc ấn vào lựa chọn</p>
                    </div>
                  </div>
                )}
            </div>

            <div>
              <input value={openBook?.title || ''} onChange={onChangeTitle} className='border border-grey w-full p-2 mt-2' placeholder='Nhập content' />
            </div>

            <div className='flex justify-end mt-2'>
              <Button name='Huỷ bỏ' onClick={() => setOpenBook(false)} className='mr-4 bg-gray-400' />
              <Button name='Thêm' onClick={onAddBook} />
            </div>
          </div>
        </Modal>
      </main>
    </section>
  );
}

