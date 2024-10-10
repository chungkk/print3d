// app/layout.tsx
import './globals.css';
import Link from 'next/link'; // Import Link từ Next.js để tạo liên kết

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {/* Header */}
        <header className="bg-gray-900 text-white p-4 text-center">
          {/* Sử dụng Link để điều hướng về trang chủ */}
          <Link href="/" className="text-2xl font-bold hover:underline">
            Cửa Hàng Digital
          </Link>
        </header>

        {/* Nội dung chính */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white text-center p-4 mt-6">
          <p>Bản quyền © 2024 - Cửa Hàng Digital</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
