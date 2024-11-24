import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Product from '@/app/model/product';

// GET - ดึงรายการสินค้าทั้งหมด
export async function GET() {
    try {
        await connectDB();
        const products = await Product.find().sort({ createdAt: -1 });
        return NextResponse.json({ products });
    } catch (error) {
        return NextResponse.json(
            { message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' },
            { status: 500 }
        );
    }
}

// POST - เพิ่มสินค้าใหม่
export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();
        const product = await Product.create(data);
        return NextResponse.json({ product });
    } catch (error) {
        return NextResponse.json(
            { message: 'เกิดข้อผิดพลาดในการเพิ่มสินค้า' },
            { status: 500 }
        );
    }
}
