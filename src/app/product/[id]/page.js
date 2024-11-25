"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/20/solid';
import { ShieldCheckIcon, TruckIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data.product);
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลสินค้าได้');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const addToCart = () => {
    try {
      // ดึงข้อมูลตะกร้าปัจจุบันจาก localStorage
      const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
      
      // ตรวจสอบว่าสินค้ามีในตะกร้าแล้วหรือไม่
      const existingItemIndex = currentCart.findIndex(item => item._id === product._id);
      
      if (existingItemIndex !== -1) {
        // ถ้ามีสินค้าอยู่แล้ว เพิ่มจำนวนตามที่เลือก
        currentCart[existingItemIndex].quantity += quantity;
      } else {
        // ถ้ายังไม่มีสินค้า เพิ่มสินค้าใหม่พร้อมจำนวน
        currentCart.push({ ...product, quantity });
      }
      
      // บันทึกลง localStorage
      localStorage.setItem('cart', JSON.stringify(currentCart));
      alert('เพิ่มสินค้าลงตะกร้าแล้ว');
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการเพิ่มสินค้า');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500">{error}</div>
    </div>
  );
  
  if (!product) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-gray-500">ไม่พบสินค้า</div>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* รูปภาพสินค้า */}
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          {/* รายละเอียดสินค้า */}
          <div className="mt-10 lg:mt-0 lg:pl-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            {/* ราคาและการให้คะแนน */}
            <div className="mt-6">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ฿{product.price.toLocaleString()}
              </p>
              <div className="mt-6 flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className="h-5 w-5 text-yellow-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="ml-3 text-sm text-gray-500">
                  4.5 (150 รีวิว)
                </p>
              </div>
            </div>

            {/* รายละเอียด */}
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-500">
                {product.description}
              </p>
            </div>

            {/* คุณสมบัติเพิ่มเติม */}
            <div className="mt-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 text-green-500" />
                  <span className="ml-2 text-sm text-gray-500">
                    รับประกันสินค้าจากทางการ
                  </span>
                </div>
                <div className="flex items-center">
                  <TruckIcon className="h-5 w-5 text-blue-500" />
                  <span className="ml-2 text-sm text-gray-500">
                    จัดส่งฟรี
                  </span>
                </div>
              </div>
            </div>

            {/* จำนวนสินค้า */}
            <div className="mt-8">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-md bg-gray-100 p-2 hover:bg-gray-200"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="rounded-md bg-gray-100 p-2 hover:bg-gray-200"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
                <span className="ml-4 text-sm text-gray-500">
                  คงเหลือ {product.stock} ชิ้น
                </span>
              </div>
            </div>

            {/* ปุ่มเพิ่มลงตะกร้า */}
            <div className="mt-8">
              <button
                onClick={addToCart}
                className="w-full bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 disabled:bg-gray-400 
                          transition-colors duration-200 flex items-center justify-center space-x-2"
                disabled={product.stock === 0}
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span>{product.stock > 0 ? 'เพิ่มลงตะกร้า' : 'สินค้าหมด'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 