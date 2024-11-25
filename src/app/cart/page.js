"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
        calculateTotal(cart);
    }, []);

    const calculateTotal = (items) => {
        const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotal(sum);
    };

    const updateQuantity = (productId, newQuantity) => {
        const updatedCart = cartItems.map(item => {
            if (item._id === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
        // ทริกเกอร์ event เพื่อให้ Navbar อัพเดท
        window.dispatchEvent(new Event('storage'));
    };

    const removeItem = (productId) => {
        const updatedCart = cartItems.filter(item => item._id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotal(updatedCart);
        window.dispatchEvent(new Event('storage'));
    };

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">ตะกร้าสินค้าว่างเปล่า</h2>
                    <Link href="/product" className="text-blue-600 hover:text-blue-800">
                        กลับไปเลือกซื้อสินค้า
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">ตะกร้าสินค้า</h1>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    {cartItems.map((item) => (
                        <div key={item._id} className="flex items-center gap-4 p-4 border-b">
                            <div className="relative w-24 h-24">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    fill
                                    className="object-cover rounded"
                                />
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-gray-600">฿{item.price.toLocaleString()}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                        className="px-2 py-1 border rounded"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                        className="px-2 py-1 border rounded"
                                    >
                                        +
                                    </button>
                                    <button
                                        onClick={() => removeItem(item._id)}
                                        className="ml-4 text-red-500 hover:text-red-700"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="lg:col-span-4">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">สรุปคำสั่งซื้อ</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>ราคารวม</span>
                                <span>฿{total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>ค่าจัดส่ง</span>
                                <span>ฟรี</span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-semibold">
                                    <span>รวมทั้งหมด</span>
                                    <span>฿{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700">
                            ดำเนินการสั่งซื้อ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 