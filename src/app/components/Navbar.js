"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('user');
        if (token) {
            setUser(JSON.parse(token));
        }

        const updateCart = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(cart);
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            setCartItemCount(count);
        };

        updateCart();
        window.addEventListener('storage', updateCart);
        return () => window.removeEventListener('storage', updateCart);
    }, []);

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/account';
    };

    return (
        <nav className="bg-white shadow-md w-full h-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold">
                            BEEBOX
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-8">
                        {user ? (
                            <div className="relative group">
                                <div className="hover:text-gray-600 flex flex-col items-center cursor-pointer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    <span className="text-sm">{user.username}</span>
                                </div>

                                {/* Dropdown Menu - with delay */}
                                <div 
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 
                                             invisible opacity-0 group-hover:visible group-hover:opacity-100
                                             transition-all duration-300 delay-300 ease-in-out"
                                >
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        โปรไฟล์
                                    </Link>
                                    {user?.role === 'admin' && (
                                        <Link
                                            href="/admin/products"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            จัดการระบบ
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        ออกจากระบบ
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/account" className="hover:text-gray-600 flex flex-col items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                <span className="text-sm">เข้าสู่ระบบ</span>
                            </Link>
                        )}
                        <div className="relative group">
                            <Link href="/cart" className="hover:text-gray-600 flex flex-col items-center relative">
                                <div className="relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    {cartItemCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                            {cartItemCount}
                                        </span>
                                    )}
                                </div>
                                <span className="text-sm">ตะกร้า</span>
                            </Link>

                            {/* Dropdown Cart Preview */}
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-4 z-50 
                                           invisible opacity-0 group-hover:visible group-hover:opacity-100
                                           transition-all duration-300 max-h-[80vh] overflow-y-auto">
                                <div className="px-4">
                                    <h3 className="text-lg font-semibold mb-4">ตะกร้าสินค้า</h3>
                                    {cartItems.length === 0 ? (
                                        <p className="text-gray-500 text-center py-4">ไม่มีสินค้าในตะกร้า</p>
                                    ) : (
                                        <>
                                            <div className="space-y-4">
                                                {cartItems.map((item) => (
                                                    <div key={item._id} className="flex items-center gap-3">
                                                        <div className="relative w-16 h-16 flex-shrink-0">
                                                            <Image
                                                                src={item.imageUrl}
                                                                alt={item.name}
                                                                fill
                                                                className="object-cover rounded"
                                                            />
                                                        </div>
                                                        <div className="flex-grow">
                                                            <h4 className="text-sm font-medium">{item.name}</h4>
                                                            <p className="text-sm text-gray-500">
                                                                {item.quantity} x ฿{item.price.toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-4 pt-4 border-t">
                                                <div className="flex justify-between font-semibold">
                                                    <span>ราคารวม</span>
                                                    <span>฿{calculateTotal().toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <div className="mt-4 space-y-2">
                                                <Link
                                                    href="/cart"
                                                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                                                >
                                                    ดูตะกร้าสินค้า
                                                </Link>
                                                <button className="block w-full text-center border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-50">
                                                    ชำระเงิน
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
