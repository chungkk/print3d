"use client";
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import Navbar from "@/components/Layout/Navbar";
import { BiSolidCloudDownload } from "react-icons/bi";
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { useDropzone } from 'react-dropzone';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { domToPng } from 'modern-screenshot';
import { useClientMediaQuery } from '@/hooks/useClientMediaQuery';

const bookInit = [
  { id: 1, title: 'Quyền sách yêu thích nhất', },
  { id: 2, title: 'Cốt truyện hay nhất' },
  { id: 3, title: 'Bìa đẹp nhất' },
  { id: 4, title: 'Quyền sách bạn sẽ đọc' },
  { id: 5, title: 'Quyển sách bạn sẽ gọi ý cho mọi người' },
  { id: 6, title: 'Quyển sách dày nhất' },
  { id: 7, title: 'Bạn ghét nhưng mọi người thích' },
  { id: 8, title: 'Bạn thích nhưng mọi người ghét' },
  { id: 9, title: 'Bị đánh giá thấp/không nổi tiếng' },
  { id: 10, title: 'Được đánh giá cao nhưng lại bình thường' },
  { id: 11, title: 'Có nhiều kiển thức/thông tin bổ ích' },
  { id: 12, title: 'Quyển sách có ảnh hưởng lớn tới bạn' },
  { id: 13, title: 'Quyển sách làm bạn khóc' },
  { id: 14, title: 'Quyền sách có nội dung chữa lành' },
  { id: 15, title: 'Hay hơn kì vọng' },
  { id: 16, title: 'Không như kì vọng' },
  { id: 17, title: 'Nhân vật chinh bạn thích nhất' },
  { id: 18, title: 'Plot twist sốc nhất' },
  { id: 19, title: 'Quyền sách bạn đã đọc lại nhiều lần' },
  { id: 20, title: 'Quyền sách bạn không đọc hết' },
  { id: 21, title: 'Tác giả yêu thích' },
  { id: 22, title: 'Đã được chuyển thể thành phim' },
  { id: 23, title: 'Series truyện yêu thích' },
  { id: 24, title: 'Không phải thể loại bạn hay đọc' },
];

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
  const [author, setAuthor] = useState('@SachOi');

  const isMobile = useClientMediaQuery('(max-width: 600px)');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const bookLocal = localStorage.getItem("sachOiBooks") || [];
      const authorLocal = localStorage.getItem("sachOiAuthor");
      bookLocal?.length && setBooks(JSON.parse(bookLocal));
      authorLocal && setAuthor(authorLocal);
    }
  }, []);

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
    const capture = document.getElementById('capture');
    domToPng(capture).then(dataUrl => {
      const link = document.createElement('a');
      link.download = `sachoi.com-${author?.replace(/[^a-zA-Z0-9]/g, '')}.png`;
      link.href = dataUrl;
      link.click();
    });
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

  const onChangeAuthor = (ev) => {
    setAuthor(ev.target.value);
    localStorage.setItem('sachOiAuthor', ev.target.value);
  };


  return (
    <section className="px-4 md:px-6 py-6">
      <main className="flex flex-col justify-between">
        <Navbar />
        <div className='md:px-10'>
          <div className='my-4 md:px-4 flex flex-row items-end justify-between'>
            <div className='text-[#7B7754] text-sm w-1/2'>
              <div>Chỉnh sửa tác giả?</div>
              <div className='flex flex-col sm:flex-row'>
                <input value={author} onChange={onChangeAuthor}
                  className='rounded-md border border-gray-300 p-2 sm:mr-2'
                  placeholder='Nhập tên bạn' />
                {/* <Button name='Update' className='bg-green-500 text-white mt-2 sm:mt-0' /> */}
              </div>
            </div>
            <div onClick={onExport} className='border flex flex-row items-center rounded-md p-3 bg-red-500  cursor-pointer'>
              <div className='font-bold text-white'>Export</div>
              <BiSolidCloudDownload className='ml-2 text-2xl text-white' />
            </div>
          </div>
          <div id='capture' className='bg-[#FDF2E4] md:p-2'>
            <div className='mt-1 mr-2 sm:mt-1 sm:mr-1 text-right font-serif font-light text-[7px] md:text-base text-[#7B7754]'>SachOi.com/review</div>
            <div className='text-center font-serif font-bold text-3xl md:text-4xl xl:text-6xl text-[#7B7754]'>About you: Books</div>
            <div className='text-right font-serif font-bold text-[10px] sm:text-2xl mb-2 sm:mb-3 text-[#7B7754] mr-12 sm:mr-20'>{author}</div>
            <div className='p-22 sm:mt-10 grid grid-cols-6 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 gap-0'>
              {books?.map(book => {
                return (
                  <div key={book.id} className='flex flex-col items-center mb-2 sm:min-h-64 rounded-lg sm:p-1 cursor-pointer'>
                    <div onClick={!book?.cover ? onOpenAddBook(book) : () => { }} className='w-[50px] h-[70px] sm:w-20 sm:h-32 md:w-24 md:h-40 xl:w-44 xl:h-56 bg-gray-300 border-[1px] border-black overflow-hidden'>
                      <TransformWrapper>
                        <TransformComponent>
                          {book?.cover && <img src={book?.cover}
                            alt={book.title} className='w-[50px] h-[70px] sm:w-20 sm:h-32  md:w-24 md:h-40 xl:w-44 xl:h-56 object-cover' />}
                        </TransformComponent>
                      </TransformWrapper>
                    </div>
                    <div onClick={onOpenAddBook(book)} className='flex flex-col items-center justify-center sm:mt-2'>
                      <h3 className='text-[8px] sm:text-xl md:text-xl xl:text-3xl text-center font-bold overflow-hidden line-clamp-3 mt-1 text-[#7B7754]'>{book.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
                alt={'Book cover'} className='w-[80px] h-[140px] sm:w-20 sm:h-28 object-cover sm:mr-4 ' />}
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

