import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/app/model/user';

export async function GET(request) {
    try {
        const secretKey = request.headers.get('x-admin-key');
        
        // ตรวจสอบ secret key (ควรเก็บใน environment variable)
        if (secretKey !== process.env.ADMIN_SECRET_KEY) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        const adminUser = await User.findOne({ username: 'admin' });
        if (!adminUser) {
            return NextResponse.json(
                { message: 'Admin user not found' },
                { status: 404 }
            );
        }

        // สร้าง user object สำหรับ response
        const userResponse = {
            id: adminUser._id,
            username: adminUser.username,
            email: adminUser.email,
            role: adminUser.role,
            createdAt: adminUser.createdAt
        };

        return NextResponse.json({ user: userResponse });

    } catch (error) {
        console.error('Direct Admin Login Error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
} 