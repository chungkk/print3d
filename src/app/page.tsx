// app/page.tsx
import Link from 'next/link';

const products = [
  { id: '1', name: 'Ace Chibi', imageUrl: '/product1.gif', price: 0.91 },
  { id: '2', name: 'Ace Chibi', imageUrl: '/product2.gif', price: 1 }
  // Thêm sản phẩm khác tại đây
];

const HomePage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xl font-bold">${product.price}</span>
              </div>
              <h2 className="text-white text-center mt-2">{product.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
