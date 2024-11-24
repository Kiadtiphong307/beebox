"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            router.push('/account');
            return;
        }
        setUser(JSON.parse(userData));
    }, [router]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold mb-8">โปรไฟล์ของฉัน</h1>
                
                <div className="space-y-6">
                    <div className="flex items-center justify-center mb-8">
                        <div className="bg-gray-200 rounded-full p-8">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-24 w-24 text-gray-600"
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
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">ชื่อผู้ใช้</label>
                            <p className="mt-1 p-3 bg-gray-50 rounded-md">{user.username}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">อีเมล</label>
                            <p className="mt-1 p-3 bg-gray-50 rounded-md">{user.email}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">สถานะ</label>
                            <p className="mt-1 p-3 bg-gray-50 rounded-md">
                                {user.role === 'admin' ? 'ผู้ดูแลระบบ' : 'สมาชิก'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">วันที่สมัคร</label>
                            <p className="mt-1 p-3 bg-gray-50 rounded-md">
                                {new Date(user.createdAt).toLocaleDateString('th-TH')}
                            </p>
                        </div>
                    </div>

                    {/* เพิ่มปุ่มแก้ไขข้อมูลหรือเปลี่ยนรหัสผ่านตามต้องการ */}
                    <div className="mt-8 flex justify-end space-x-4">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            แก้ไขข้อมูล
                        </button>
                        <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                            เปลี่ยนรหัสผ่าน
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 