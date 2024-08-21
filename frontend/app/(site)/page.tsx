'use client'

import { Carousel } from "flowbite-react";
import Image from "next/image";
import NavBar from "../components/NavBar/NavBar";

export default function MyPage() {
  return (
    <div className='bg-white dark:bg-white p-5'>
    <NavBar />
    <div className="h-56 sm:h-64 xl:h-96 2xl:h-96">
      <Carousel>
        <Image width={15} height={150} src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
        <Image width={150} height={150} src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
        <Image width={150} height={150} src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
        <Image width={150} height={150} src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
        <Image width={150} height={150} src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
      </Carousel>
    </div>
    </div>
  );
}