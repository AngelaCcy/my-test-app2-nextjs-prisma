"use server"

import prisma from "@/lib/prisma";
import { Product } from "./fake-data";

export async function getProducts() {
    const data = await prisma.product.findMany();
    return data;
}

export async function getProductById (id: number){
    const product = await prisma.product.findUnique({
        where: {
            id: id,
        },
    })
    return product;
}

export async function updateProductById(id: number, data: Product) {
    const updatedProduct = await prisma.product.update({
        where: { id: id },
        data: {
            title: data.title,
            description: data.description,
            price: data.price,
            category: data.category,
            image: data.image
        }
    });
    return updatedProduct;
}

export async function deleteProductById(id: number) {
    const deletedProduct = await prisma.product.delete({
        where: { id: id },
    });
    return deletedProduct;
}

export async function createProduct({title, price, description, category, image }: Product) {
    const createdProduct = await prisma.product.create({
        data: {
            title: title,
            description: description,
            price: price,
            category: category,
            image: image
        }
    });
    return createdProduct;
}