"use client";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import Navbar from "@/components/Layout/Navbar";
import { BiSolidCloudDownload } from "react-icons/bi";
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import html2canvas from 'html2canvas';

const bookInit = [
  { id: 1, title: 'Quyền sách yêu thích nhất', cover: 'https://salt.tikicdn.com/cache/750x750/media/catalog/product/s/o/son-ca-van-hot.u2469.d20161101.t161003.377293.jpg' },
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

export default function Page() {
  const [books, setBooks] = useState(bookInit);
  const [openBook, setOpenBook] = useState();
  const [urlBook, setUrlBook] = useState();
  const [uploadType, setUploadType] = useState('link');
  const elementRef = useRef(null);


  const onExport = () => {
    const capture = document.getElementById('capture');
    toPng(capture, { cacheBust: true }).then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'my-image-name.jpeg';
      link.href = dataUrl;
      link.click();
    })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    // html2canvas(elementRef.current, { useCORS: true, allowTaint: false }).then((canvas) => {
    //   const link = document.createElement('a');
    //   link.href = canvas.toDataURL('image/png');
    //   link.download = 'screenshot.png';
    //   link.click();
    // });
  };

  const onChangeUrlPath = (e) => {
    setUrlBook(e.target.value);
  };

  const onSelectUploadType = (type) => () => setUploadType(type);

  const onAddBook = async () => {
    if (!urlBook) return;

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
          return { ...book, cover: cv };
        }
        return book;
      });
      setBooks(addCoverToBook);
      setOpenBook(null);
      setUrlBook('');

    } catch (error) {
      console.log("=====>>>>> onAddBook error: " + error);
    }
  };

  const onOpenAddBook = (book) => () => {
    setOpenBook(book);
    setUrlBook('');
  };


  return (
    <section className="px-4 md:px-6  py-6">
      <main className="flex flex-col justify-between">
        <Navbar />
        <div className='md:px-10'>
          <div className='my-4 md:px-4 flex flex-row items-center justify-between'>
            <div className='text-[#7B7754] text-sm w-1/2'>Original template @mhanhtulamdoo</div>
            <div onClick={onExport} className='border flex flex-row items-center rounded-md p-3 bg-red-500  cursor-pointer'>
              <div className='font-bold text-white'>Export</div>
              <BiSolidCloudDownload className='ml-2 text-2xl text-white' />
            </div>
          </div>
          <div id='capture' ref={elementRef} className='bg-[#FDF2E4] md:p-2'>
            <div className='text-center font-serif font-bold text-3xl md:text-8xl sm:mt-3 text-[#7B7754]'>About you: Books</div>
            <div>

              <div className='text-right font-serif font-bold text-[10px] md:text-sm mb-1 sm:mb-3 text-[#7B7754] mr-12 sm:mr-20'>SachOi.com/review</div>
            </div>
            <div className='p-22 sm:mt-10 grid grid-cols-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-0'>
              {books?.map(book => {
                return (
                  <div key={book.id} className='flex flex-col items-center mb-2 sm:min-h-64 rounded-lg sm:p-1 cursor-pointer'>
                    <div onClick={onOpenAddBook(book)} className='w-[50px] h-[70px] sm:w-32 sm:h-52 bg-gray-300 border-[1px] border-black overflow-hidden'>
                      {book?.cover && <img src={book?.cover}
                        alt={book.title} className='w-[50px] h-[70px] sm:w-32 sm:h-52 object-cover' />}
                    </div>
                    <div className='flex flex-col items-center justify-center sm:mt-2'>
                      <h3 className='text-[8px] sm:text-2xl text-center font-bold overflow-hidden line-clamp-3 mt-1 text-[#7B7754]'>{book.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Modal
          open={openBook}
          className='w-11/12 sm:w-1/2 sm:h-[300px] rounded-md'
          onClose={() => setOpenBook(false)}
          onClickOutSide={() => setOpenBook(false)}>
          <div className='w-full'>
            <h2 className='font-bold text-xl'>Thêm Sách</h2>
            <div className='mt-2'>Chọn ảnh từ link ( goodreads.com hoặc tiki.com ) hoặc tải lên từ thiết bị</div>
            <div>
              <div onClick={onSelectUploadType('link')} className='cursor-pointer'>
                <input type="radio" value="link" name="uploadType" onChange={() => onSelectUploadType('link')} checked={uploadType === 'link'} />
                <span className='ml-1'>Chọn ảnh từ link ( Chỉ từ goodreads.com hoặc tiki.com hoặc link ảnh )</span>
              </div>
              <div onClick={onSelectUploadType('device')} className='cursor-pointer'>
                <input type="radio" value="device" name="uploadType" onChange={() => onSelectUploadType('device')} checked={uploadType === 'device'} />
                <span className='ml-1'>Tải lên từ thiết bị ( comming soon )</span>
              </div>
            </div>
            <p className='mt-2'>Bạn hãy lấy link từ goodreads.com hoặc tiki.com rồi paste vào ô dưới:</p>
            <textarea value={urlBook} onChange={onChangeUrlPath} className='border border-grey w-full p-2' />
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

