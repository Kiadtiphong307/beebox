import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'กรุณากรอกชื่อสินค้า'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'กรุณากรอกรายละเอียดสินค้า']
    },
    price: {
        type: Number,
        required: [true, 'กรุณากรอกราคา'],
        min: [0, 'ราคาต้องไม่ต่ำกว่า 0']
    },
    stock: {
        type: Number,
        required: [true, 'กรุณากรอกจำนวนสินค้า'],
        min: [0, 'จำนวนสินค้าต้องไม่ต่ำกว่า 0']
    },
    imageUrl: {
        type: String,
        required: [true, 'กรุณาใส่รูปภาพสินค้า']
    },
    category: {
        type: String,
        required: [true, 'กรุณาเลือกหมวดหมู่'],
        enum: ['อาหาร', 'เครื่องดื่ม', 'ขนม', 'อื่นๆ']
    }
}, {
    timestamps: true
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;