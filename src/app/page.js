import React from "react";
import Home from "./Home";
import Navbar from "@/components/Layout/Navbar";


export default function page({ searchParams }) {
  return (
    <section className="px-4 md:px-40 py-6">
      <main className="flex flex-col justify-between ">
        <Navbar />
        <Home searchParams={searchParams} />
      </main>
    </section>
  );
}