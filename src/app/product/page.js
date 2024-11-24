"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },

];

const slides = [
  {
    id: 1,
    src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
    alt: "Slide 1",
  },
  {
    id: 2,
    src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-02.jpg",
    alt: "Slide 2",
  },
];

export default function Product() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ปุ่มซ้าย
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // ปุ่มขวา
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // กดจุดไปยังรูปภาพ
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="product">
      {/* รูปภาพ */}
      <div className="max-w-[1200px] h-[520px] w-full m-auto py-16 px-4 relative group">
        <div className="relative h-full w-full rounded-2xl bg-center bg-cover duration-500">
          <Image
            src={slides[currentIndex].src}
            alt={slides[currentIndex].alt}
            fill
            className="rounded-2xl object-cover"
            priority
          />

          {/* ปุ่มซ้าย */}
          <div
            className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
            onClick={prevSlide}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </div>

          {/* ปุ่มขวา */}
          <div
            className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
            onClick={nextSlide}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </div>
        </div>

        {/* จุดนำทางด้านล่าง */}
        <div className="flex top-4 justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`text-2xl cursor-pointer mx-2 ${
                currentIndex === slideIndex ? "text-blue-500" : "text-gray-400"
              }`}
            >
              ●
            </div>
          ))}
        </div>
      </div>
      {/* รายการสินค้า */}
      <div className="ProductList">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <Image
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  width={500}
                  height={500}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
