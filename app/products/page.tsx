"use client";
// Route 的page 一定用default export , 不能用named export 

import { useState, ChangeEvent } from "react";

import { sortByPrice, Direction, filterProductByTitle, FAKE_PRODUCT_DATA } from "../utils/fake-data";
import ProductCard from "../components/ProductCard";

const Products = () => {
    const [query, setQuery] = useState('');
    const [direction, setDirection] = useState<Direction>("ASC");
    // 因direction 是State, 它變了即會自動Rerender, 會trigger 整個Home()元件重新執行
    // 因此會執行到下一行來更新products 陣列的內容
    const sorted_products = sortByPrice(direction,FAKE_PRODUCT_DATA);
    const products = filterProductByTitle(query,sorted_products);

    const handleSortingDirectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setDirection(e.target.value as Direction);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    return (
        <div className="bg-white">
            <h1 className="text-[#333] mt-8 text-center text-4xl font-bold">商品列表</h1>
            <div className='text-[#333] gap-4 flex mt-7 items-center justify-center'>
                Search:
                <input onChange={handleChange} type='text' placeholder='enter title keywords here...'/>
            </div>
            <div className="mt-7 flex items-center justify-center text-[#333] text-lg">
                Price:
                <select value={direction} onChange={handleSortingDirectionChange}>
                <option value="ASC">價格由低到高</option>
                <option value="DES">價格由高到低</option>
                </select>
            </div>
            <div className="flex items-center flex-col my-7 mx-0 gap-6">
                {products.map((product) => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;
