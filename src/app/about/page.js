import React from "react";
import Navbar from "@/components/Layout/Navbar";


export default function About({ searchParams }) {
  return (
    <section className="px-4 md:px-40 h-screen py-6 bg-[#F9EFD7]">
      <main className="flex flex-col justify-between h-full ">
        <Navbar />
        <div className="flex justify-center items-center flex-col flex-1">
          <div className="font-semibold text-4xl md:text-8xl text-center">nice to meet you</div>
          <div className="mt-8 px-6">
            <p>Tớ là Cee!. </p>
            <p className="md:max-w-[600px]">Nếu bạn có câu hỏi gì thì đừng ngần ngại ném tôi 1 <a className="text-blue-500" href="mailto:hello@sachoi.com">cái meo ở đây!</a></p>
          </div>
        </div>
      </main>
    </section>
  );
}