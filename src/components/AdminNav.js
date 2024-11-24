"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function AdminNav() {
    const { data: session } = useSession();

    if (!session?.user?.role === 'admin') return null;

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link href="/admin" className="hover:text-gray-300">
                        Dashboard
                    </Link>
                    <Link href="/admin/products" className="hover:text-gray-300">
                        จัดการสินค้า
                    </Link>
                    <Link href="/admin/users" className="hover:text-gray-300">
                        จัดการผู้ใช้
                    </Link>
                </div>
                <div>
                    <span className="mr-4">Admin: {session.user.name}</span>
                    <button 
                        onClick={() => signOut()}
                        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                    >
                        ออกจากระบบ
                    </button>
                </div>
            </div>
        </nav>
    );
} 