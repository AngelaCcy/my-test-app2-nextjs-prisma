"use client";
// Route 的page 一定用default export , 不能用named export

import { useParams, useRouter } from 'next/navigation'
import Link from "next/link";
import { Product as ProductType } from "@/app/utils/fake-data";
import ProductCard from "../../components/ProductCardAction";
import { deleteProductById, getProductById } from '@/app/utils/actions';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Swal from 'sweetalert2';


const Product = () => {
    const params = useParams();
    const id = Number(params?.id);
    const router = useRouter();
    const [product, setProduct] = useState<ProductType>({} as ProductType);

    useEffect(() => {
        const fetchProduct = async () => {
            const fetchedProduct = await getProductById(id);
            // const response = await fetch("http://localhost:3000/api/products/" + id);
            // const fetchedProduct = await response.json();
            setProduct(fetchedProduct || {} as ProductType);
        }
        if (id) fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        await deleteProductById(id);
        Swal.fire({
            title: "Are you sure you want to delete this product?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title: "Deleted!",
                text: "The product has been deleted.",
                icon: "success"
                }).then(() => {
                router.push('/productsAction');
                });
            }
        });
    }

    return (
        <div className="bg-white h-screen" >
            <h1 className="text-[#333] mt-7 text-center text-4xl font-bold">商品詳細頁面</h1>
            <div className="text-[#333] mt-4 text-2xl text-center underline">
                <Link href="/productsAction">Back to Product List</Link>
            </div>
            {Object.keys(product).length > 0 && (
                <div className="flex justify-center mt-7">
                    <ProductCard product={product} all />
                </div>
            )}
            <div className='flex justify-center mt-7'>
                {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => {
                    router.push(`/products/edit/${id}`);
                }}>
                    Edit
                </button> */}
                <Link href={`/productsAction/edit/${id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">
                    <button>Edit</button>
                </Link>
                <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            </div>
        </div>
    );
};

export default Product;
