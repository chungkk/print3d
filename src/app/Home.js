"use client";  // Để sử dụng các hook như useState

import { useState } from 'react';
import Link from 'next/link';

const products = [
  { id: 1, name: 'Sản phẩm 1', price: 100000, imageUrl: '/images/products/product1.gif' },
  { id: 2, name: 'Sản phẩm 2', price: 150000, imageUrl: '/images/products/product1.gif' },
  { id: 3, name: 'Sản phẩm 3', price: 200000, imageUrl: '/images/products/product3.jpg' },
  { id: 4, name: 'Sản phẩm 4', price: 250000, imageUrl: '/images/products/product4.jpg' },
  // ... Thêm các sản phẩm khác tại đây
];

const ITEMS_PER_PAGE = 40; // Hiển thị 4 cột x 10 hàng mỗi trang

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  
  const currentProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Danh sách sản phẩm</h1>

      <div className="grid grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
          <div className="relative border p-4 cursor-pointer group">
            <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Giá: {product.price} VND
            </div>
          </div>
        </Link>
        
        ))}
      </div>

      {/* Phân trang */}
      <div className="mt-8 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-4 py-2 border ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
