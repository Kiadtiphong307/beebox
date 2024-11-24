import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function withAuth(handler, roles = []) {
    return async (req) => {
        try {
            const token = await getToken({ req });

            if (!token) {
                return NextResponse.json(
                    { message: 'กรุณาเข้าสู่ระบบ' },
                    { status: 401 }
                );
            }

            // ตรวจสอบสิทธิ์
            if (roles.length && !roles.includes(token.role)) {
                return NextResponse.json(
                    { message: 'ไม่มีสิทธิ์เข้าถึง' },
                    { status: 403 }
                );
            }

            return handler(req, token);
        } catch (error) {
            return NextResponse.json(
                { message: 'เกิดข้อผิดพลาดในการตรวจสอบสิทธิ์' },
                { status: 500 }
            );
        }
    };
} 