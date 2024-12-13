"use client";
// Route 的page 一定用default export , 不能用named export 

import { useState, ChangeEvent, useEffect } from "react";
import { sortByPrice, Direction, filterProductByTitle, Product } from "../utils/fake-data";
import ProductCard from "../components/ProductCardAction";
import { getProducts } from "../utils/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Products = () => {
    const [query, setQuery] = useState('');
    const [direction, setDirection] = useState<Direction>("ASC");
    // 因direction 是State, 它變了即會自動Rerender, 會trigger 整個Home()元件重新執行
    // 因此會執行到下一行來更新products 陣列的內容
    const [db_products, setDbProducts] = useState<Product[]>([]);
    let products: Product[] = [];
    const [productsResults, setproductsResults] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            // const response = await fetch("http://localhost:3000/api/products/");
            // const data = await response.json();
            setDbProducts(data);
            setproductsResults(data);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (db_products.length > 0) {
            console.log(db_products);
            const sorted_products = sortByPrice(direction, db_products);
            products = filterProductByTitle(query,sorted_products);
            setproductsResults(products);
        }
    }, [direction, query]);

    const handleSortingDirectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setDirection(e.target.value as Direction);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    return (
        <div className="bg-white">
            <h1 className="text-[#333] mt-8 text-center text-4xl font-bold pt-12">Product List using Server Action</h1>
            <div className="flex items-center justify-center pt-4">
                <Link href="/productsAction/create">
                    <Button className="bg-red-300 hover:bg-red-400">Create Product</Button>
                </Link>
            </div>
            <div className='text-[#333] gap-4 flex mt-7 items-center justify-center'>
                Search:
                <input onChange={handleChange} type='text' placeholder='enter title keywords here...'/>
            </div>
            <div className="mt-7 flex items-center justify-center text-[#333] text-lg">
                Price:
                <select value={direction} onChange={handleSortingDirectionChange}>
                <option value="ASC">Price from low to high</option>
                <option value="DES">Price from high to low</option>
                </select>
            </div>
            <div className="flex items-center flex-col my-7 mx-0 gap-6">
                {productsResults?.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;
