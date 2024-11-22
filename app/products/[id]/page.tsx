"use client";
// Route 的page 一定用default export , 不能用named export

import { useParams } from 'next/navigation'
import Link from "next/link";
import { getProductById } from "@/app/utils/fake-data";
import ProductCard from "../../components/ProductCard";


const Product = () => {
    const params = useParams();
    const id = params?.id;

    if (!id) return <></>;
    const product = getProductById(id as string);

    return (
        <div className="bg-white h-screen" >
            <h1 className="text-[#333] mt-7 text-center text-4xl font-bold">商品詳細頁面</h1>
            <div className="text-[#333] mt-4 text-2xl text-center underline">
                <Link href="/products">回產品列表</Link>
            </div>
            <div className="flex justify-center mt-7">
                <ProductCard product={product} all />
            </div>
        </div>
    );
};

export default Product;
