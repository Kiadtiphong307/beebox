import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/app/model/user';
import bcrypt from 'bcryptjs';

export async function POST() {
    try {
        await connectDB();

        const admin = await User.findOne({ username: 'admin' });
        if (!admin) {
            return NextResponse.json(
                { message: 'ไม่พบบัญชี Admin' },
                { status: 404 }
            );
        }

        // เปลี่ยนรหัสผ่านเป็น admin12345
        const hashedPassword = await bcrypt.hash('admin12345', 10);
        admin.password = hashedPassword;
        await admin.save();

        return NextResponse.json({ 
            message: 'เปลี่ยนรหัสผ่าน Admin สำเร็จ',
            credentials: {
                username: 'admin',
                password: 'admin12345'
            }
        });

    } catch (error) {
        console.error('Reset Password Error:', error);
        return NextResponse.json(
            { message: 'ไม่สามารถเปลี่ยนรหัสผ่านได้' },
            { status: 500 }
        );
    }
} 