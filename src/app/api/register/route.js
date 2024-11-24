import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongoose';
import User from '../../model/user';

export async function POST(request) {
    try {
        await connectDB();
        
        // Parse the request body
        const body = await request.json();
        const { username, email, password } = body;

        // Validate required fields
        if (!username || !email || !password) {
            return NextResponse.json(
                { message: 'กรุณากรอกข้อมูลให้ครบถ้วน' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return NextResponse.json(
                    { message: 'อีเมลนี้ถูกใช้งานแล้ว' },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                { message: 'ชื่อผู้ใช้นี้ถูกใช้งานแล้ว' },
                { status: 400 }
            );
        }

        // Create new user
        const user = await User.create({
            username,
            email,
            password
        });

        // Return success response
        return NextResponse.json({
            success: true,
            message: 'ลงทะเบียนสำเร็จ',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { 
                success: false,
                message: 'เกิดข้อผิดพลาดในการลงทะเบียน',
                error: error.message 
            },
            { status: 500 }
        );
    }
}