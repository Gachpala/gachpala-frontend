// Mock API route for /api/products
import { NextResponse } from 'next/server';

const products = [
    {
        "id": 1,
        "name": "Product 1",
        "description": "Healthy indoor plant 1",
        "price": 101,
        "stock": 21,
        "category_id": 1,
        "category_name": "Category 1",
        "image_url": "/uploads/products/product_1.png",
        "is_featured": false,
        "created_at": "2026-01-01T11:00:00+06:00",
        "status": "active",
        "weight": "0.60",
        "dimensions": "11x11 cm"
    },
    // ... (products 2-100 omitted for brevity)
    {
        "id": 101,
        "name": "Money Plant (Golden Pothos)",
        "description": "this is a money plant",
        "price": 100,
        "stock": 200,
        "category_id": 12,
        "category_name": "Category 12",
        "image_url": "/uploads/products/monkey-puzzle-tree-Araucaria-araucana.webp",
        "is_featured": true,
        "created_at": "2026-01-29T14:32:42+06:00",
        "status": "active",
        "weight": "0.50",
        "dimensions": "10"
    }
];

export async function GET() {
    return NextResponse.json(products);
}
