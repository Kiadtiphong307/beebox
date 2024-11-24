import { NextResponse } from 'next/server';
import crypto from 'crypto';

// เก็บ tokens ชั่วคราว (ควรใช้ Redis ในระบบจริง)
const temporaryTokens = new Map();

export async function POST(request) {
    try {
        const { adminPassword } = await request.json();
        
        // ตรวจสอบรหัสผ่านสำหรับสร้างลิงก์
        if (adminPassword !== process.env.ADMIN_LINK_PASSWORD) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        // สร้าง token แบบใช้ครั้งเดียว
        const token = crypto.randomBytes(32).toString('hex');
        
        // เก็บ token พร้อมเวลาหมดอายุ (30 นาที)
        temporaryTokens.set(token, Date.now() + 30 * 60 * 1000);

        // สร้าง URL สำหรับ admin login
        const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/admin-login?token=${token}`;

        return NextResponse.json({ loginUrl });

    } catch (error) {
        console.error('Create Admin Link Error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
} 