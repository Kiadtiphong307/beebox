import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/app/model/user';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export async function GET() {
    try {
        await connectDB();

        // ลบ admin เดิม
        await User.deleteOne({ username: 'admin' });

        // สร้าง admin ใหม่
        const hashedPassword = await bcrypt.hash('admin12345', 10);
        const adminUser = await User.create({
            _id: new mongoose.Types.ObjectId('000000000000000000000001'),
            username: 'admin',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin'
        });

        // สร้าง URL สำหรับ login โดยตรง
        const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/account?username=admin&password=admin12345&autoLogin=true`;

        return NextResponse.json({ 
            message: 'สร้างบัญชี Admin สำเร็จ',
            credentials: {
                username: 'admin',
                password: 'admin12345'
            },
            loginUrl: loginUrl,
            user: {
                id: adminUser._id,
                username: adminUser.username,
                email: adminUser.email,
                role: adminUser.role
            }
        });

    } catch (error) {
        console.error('Seed Error:', error);
        return NextResponse.json(
            { message: 'ไม่สามารถสร้างบัญชี Admin ได้' },
            { status: 500 }
        );
    }
} 