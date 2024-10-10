"use client";
// app/product/[id]/page.tsx
import React, { useState } from 'react';

// Dữ liệu mẫu cho các sản phẩm
const products = [
  {
    id: '1',
    name: 'Ace Chibi',
    description: 'Mô hình nhân vật Ace Chibi, có thể in 3D.',
    price: 0.91,
    downloadLink: '/path-to-download', // Đường dẫn tải xuống
    images: [
      '/product1.gif',
      '/product2.gif',
    ],
  },
  {
    id: '2',
    name: 'Ace Chibi',
    description: 'Mô hình nhân vật Ace Chibi, có thể in 3D.',
    price: 0.91,
    downloadLink: '/path-to-download', // Đường dẫn tải xuống
    images: [
      '/product1.gif',
      '/product2.gif',
    ],
  },
  
  // Thêm sản phẩm khác tại đây
];

const ProductDetail = ({ params }: { params: { id: string } }) => {
  // Tìm sản phẩm dựa trên ID
  const product = products.find((p) => p.id === params.id);

  // Ảnh lớn hiện tại, mặc định là ảnh đầu tiên
  const [selectedImage, setSelectedImage] = useState(product?.images[0]);

  if (!product) {
    return <div>Sản phẩm không tồn tại</div>;
  }

  return (
    <div className="p-8 flex flex-col md:flex-row items-start justify-between gap-8">
      {/* Phần ảnh sản phẩm ở bên trái */}
      <div className="md:w-1/2 w-full">
        <div
          className="w-full h-[350px] md:h-[450px] rounded-lg shadow-lg overflow-hidden"
          style={{ maxWidth: '100%' }}
        >
          {/* Hiển thị ảnh phóng to với kích thước khung ảnh cố định */}
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Ảnh nhỏ để chọn */}
        <div className="flex mt-4 space-x-4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} ${index + 1}`}
              className={`w-20 h-20 object-cover cursor-pointer rounded-lg ${
                selectedImage === image ? 'border-4 border-blue-500' : ''
              }`}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>

      {/* Phần mô tả sản phẩm ở bên phải */}
      <div className="md:w-1/2 w-full bg-gray-900 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* Mô tả sản phẩm */}
          <p className="text-gray-300 mt-6">{product.description}</p>
        </div>

        {/* Thông tin thêm và nút tải xuống */}
        <div className="mt-6">
          <p className="text-xl mb-4">Giá: ${product.price}</p>
          <a
            href={product.downloadLink}
            className="inline-block w-full px-6 py-3 bg-purple-600 text-center text-white rounded-lg hover:bg-purple-700"
          >
            Tải xuống
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
