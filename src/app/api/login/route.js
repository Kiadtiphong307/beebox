import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/app/model/user';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        await connectDB();
        
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { message: 'กรุณากรอกข้อมูลให้ครบ' },
                { status: 400 }
            );
        }

        const user = await User.findOne({ username }).select('+password');
        
        if (!user) {
            return NextResponse.json(
                { message: 'ไม่พบชื่อผู้ใช้นี้' },
                { status: 401 }
            );
        }

        try {
            const isValid = await bcrypt.compare(password, user.password);
            
            if (!isValid) {
                return NextResponse.json(
                    { message: 'รหัสผ่านไม่ถูกต้อง' },
                    { status: 401 }
                );
            }

            const userResponse = {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            };

            return NextResponse.json({ user: userResponse });

        } catch (bcryptError) {
            console.error('Bcrypt compare error:', bcryptError);
            return NextResponse.json(
                { message: 'เกิดข้อผิดพลาดในการตรวจสอบรหัสผ่าน' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json(
            { message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' },
            { status: 500 }
        );
    }
}