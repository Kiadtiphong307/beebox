import { NextResponse } from 'next/server';

export async function middleware(request) {
    const path = request.nextUrl.pathname;

    // ตรวจสอบว่าเป็น path ที่ต้องการป้องกันหรือไม่
    if (path.startsWith('/admin')) {
        const user = request.cookies.get('user');

        // ถ้าไม่มี user หรือไม่ใช่ admin ให้ redirect ไปหน้า login
        if (!user || JSON.parse(user).role !== 'admin') {
            return NextResponse.redirect(new URL('/account', request.url));
        }
    }

    return NextResponse.next();
}

// กำหนด path ที่ต้องการให้ middleware ทำงาน
export const config = {
    matcher: ['/admin/:path*']
}; 