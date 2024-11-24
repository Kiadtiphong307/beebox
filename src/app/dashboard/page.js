"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            router.push('/account');
            return;
        }

        const user = JSON.parse(userStr);
        if (user.role !== 'admin') {
            router.push('/account');
            return;
        }

        setIsLoading(false);
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* จัดการสินค้า */}
                    <Link href="/dashboard/product-list" 
                        className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                                {/* Icon */}
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-medium text-gray-900">จัดการสินค้า</h2>
                                <p className="mt-1 text-sm text-gray-500">เพิ่ม, แก้ไข, ลบสินค้า</p>
                            </div>
                        </div>
                    </Link>

                    {/* จัดการผู้ใช้ */}
                    <Link href="/admin/users"
                        className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                                {/* Icon */}
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-medium text-gray-900">จัดการผู้ใช้</h2>
                                <p className="mt-1 text-sm text-gray-500">ดูรายชื่อ, จัดการสิทธิ์ผู้ใช้</p>
                            </div>
                        </div>
                    </Link>

                    {/* รายงาน */}
                    <Link href="/admin/reports"
                        className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                                {/* Icon */}
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg font-medium text-gray-900">รายงาน</h2>
                                <p className="mt-1 text-sm text-gray-500">ดูสถิติและรายงานต่างๆ</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
} 