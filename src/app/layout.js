import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "3D Printer",
  description: "Sách ơi! mở ra...",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[#F7F7F9]">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
