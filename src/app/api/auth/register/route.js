import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import User from '@/models/User';

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    // ตรวจสอบว่ามีผู้ใช้นี้อยู่แล้วหรือไม่
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 400 }
      );
    }

    // สร้างผู้ใช้ใหม่
    const user = await User.create({ email, password });

    return NextResponse.json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Registration failed' },
      { status: 500 }
    );
  }
} 