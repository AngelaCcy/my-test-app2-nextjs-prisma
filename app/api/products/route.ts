import { Product } from '@/app/utils/fake-data';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'
// 我們自己的API 路由->http://localhost:3000/api/posts
// 外部測試的API 路由
// const url = "https://jsonplaceholder.typicode.com/posts";
// 在後端server 使用Web fetch API 
export const GET = async () => {
    // try {
    const products = await prisma.product.findMany();
    if (!products) return NextResponse.json({ message: 'not found'});
    return NextResponse.json(products);
    // } catch (err: any) {
    //     return NextResponse.json({ message: err.message});
    // }    
} 

export const POST = async (req: NextRequest) => {
    const {title, price, description, category, image }: Product = await req.json();

    try {
        const createdProduct = await prisma.product.create({
            data: {
                title: title,
                description: description,
                price: price,
                category: category,
                image: image
            }
        });
        return NextResponse.json(createdProduct);
    } catch (err: unknown) {
        return NextResponse.json({ message: 'created fail'});
    }     
} 
