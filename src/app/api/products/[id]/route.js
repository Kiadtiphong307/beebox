import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Product from '@/app/model/product';

// GET - ดึงข้อมูลสินค้าตาม ID
export async function GET(request, { params }) {
    try {
        await connectDB();
        const product = await Product.findById(params.id);
        if (!product) {
            return NextResponse.json(
                { message: 'ไม่พบสินค้า' },
                { status: 404 }
            );
        }
        return NextResponse.json({ product });
    } catch (error) {
        return NextResponse.json(
            { message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' },
            { status: 500 }
        );
    }
}
// PUT - อัพเดทข้อมูลสินค้า
export async function PUT(request, { params }) {
    try {
        await connectDB();
        const data = await request.json();
        const product = await Product.findByIdAndUpdate(
            params.id,
            data,
            { new: true, runValidators: true }
        );
        if (!product) {
            return NextResponse.json(
                { message: 'ไม่พบสินค้า' },
                { status: 404 }
            );
        }
        return NextResponse.json({ product });
    } catch (error) {
        return NextResponse.json(
            { message: 'เกิดข้อผิดพลาดในการอัพเดทข้อมูล' },
            { status: 500 }
        );
    }
}

// DELETE - ลบสินค้า
export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const product = await Product.findByIdAndDelete(params.id);
        if (!product) {
            return NextResponse.json(
                { message: 'ไม่พบสินค้า' },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: 'ลบสินค้าสำเร็จ' });
    } catch (error) {
        return NextResponse.json(
            { message: 'เกิดข้อผิดพลาดในการลบข้อมูล' },
            { status: 500 }
        );
    }
}

