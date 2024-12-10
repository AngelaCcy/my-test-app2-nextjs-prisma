import prisma from '@/lib/prisma';
import { Prisma, Product } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const id = Number((await params).id);
    // try {
        const product: Product | null = await prisma.product.findUnique({
            where: {
                id: id,
            },
        })
        if (!product) return NextResponse.json({ message: 'not found'});
        return NextResponse.json(product);
    // } catch (err: any) {
    //     return NextResponse.json({ message: err.message});
    // }    
}

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    const {title, price, description, category, image } = await req.json();
    try {
        const updatedProduct: Product | null = await prisma.product.update({
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
    } catch (err: unknown) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json({ message: err.message });
      }
        // return NextResponse.json({ message: 'updated fail'});
    }    
}

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    // const url = new URL(req.url).searchParams;
    const id = Number((await params).id);
  
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