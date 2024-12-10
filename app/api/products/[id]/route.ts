import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, { params }: { params: { id: string }  }) => {
    const id = Number(params.id);
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: id,
            },
        })
        return NextResponse.json(product);
    } catch (err: any) {
        return NextResponse.json({ message: err.message});
    }    
}

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    const {_, title, price, description, category, image } = await req.json();
    try {
        const updatedProduct = await prisma.product.update({
            where: { id: id },
            data: {
                title: title,
                description: description,
                price: price,
                category: category,
                image: image
            }
        });
        return NextResponse.json(updatedProduct);
    } catch (err: any) {
        return NextResponse.json({ message: err.message});
    }    
}

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    // const url = new URL(req.url).searchParams;
    const id = Number(params.id);
  
    const post = await prisma.product.delete({
      where: {
        id: id,
      },
    });
  
    if (!post) {
      return NextResponse.json(
        {
          message: "Error",
        },
        {
          status: 500,
        }
      );
    }
  
    return NextResponse.json({});
  };