"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const router = useRouter();

    useEffect(() => {
        const loginAdmin = async () => {
            try {
                const response = await fetch('/api/admin-direct-login', {
                    headers: {
                        'x-admin-key': process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to login');
                }

                const data = await response.json();
                
                // บันทึกข้อมูล user ใน localStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // redirect ไปหน้า admin
                router.push('/admin');

            } catch (error) {
                console.error('Admin Login Error:', error);
                router.push('/account'); // redirect กลับไปหน้า login ถ้าเกิดข้อผิดพลาด
            }
        };

        loginAdmin();
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4">กำลังเข้าสู่ระบบ Admin...</p>
            </div>
        </div>
    );
} 