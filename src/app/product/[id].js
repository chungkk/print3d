"use client";  // Để sử dụng các hook như useState, useEffect

import { useRouter } from 'next/router'; // Lấy useRouter từ 'next/router'
import { useEffect, useState } from 'react';

const products = [
  { id: 1, name: 'Sản phẩm 1', price: 100000, description: 'Mô tả sản phẩm 1', imageUrl: '/images/products/product1.gif' },
  { id: 2, name: 'Sản phẩm 2', price: 150000, description: 'Mô tả sản phẩm 2', imageUrl: '/images/products/product2.jpg' },
  { id: 3, name: 'Sản phẩm 3', price: 200000, description: 'Mô tả sản phẩm 3', imageUrl: '/images/products/product3.jpg' },
  { id: 4, name: 'Sản phẩm 4', price: 250000, description: 'Mô tả sản phẩm 4', imageUrl: '/images/products/product4.jpg' },
  // Các sản phẩm khác...
];

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;  // Lấy id từ URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((p) => p.id === parseInt(id));
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;  // Hiển thị khi đang tải dữ liệu sản phẩm
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <img src={product.imageUrl} alt={product.name} className="w-1/3" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl mt-2">Giá: {product.price} VND</p>
          <p className="mt-4">{product.description}</p>
          <button className="bg-blue-500 text-white p-2 mt-4">Thêm vào giỏ hàng</button>
        </div>
      </div>
    </div>
  );
}
