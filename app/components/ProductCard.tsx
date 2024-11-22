import Image from "next/image";
import Link from "next/link";

import { Product as ProductType } from "../utils/fake-data";

interface ProductCardProps {
    product: ProductType;
    all?: boolean;
}

const ProductCard = ({ product, all }: ProductCardProps) => {
    const condition = all ? '' : 'overflow-hidden whitespace-nowrap text-ellipsis';
    // const condition = all ? '' : 'truncate';
    const { id, image, title, description, price } = product;
    return (
        <div key={id} className="flex p-6 gap-4 rounded-lg min-h-60 w-[600px] shadow-md hover:shadow-lg shadow-black/20 group">
            <div className="w-[120px] h-[167px] relative">
                <Image src={image} alt="product" layout="fill" objectFit="cover" />
            </div>
            <div className="flex flex-col gap-1 flex-1">
                <Link href={`/products/${id}`} passHref>
                    <div className="text-[#333] text-lg transition-all duration-300 group-hover:text-red-400">{title}</div>
                </Link>
                <div className={`text-cyan-500 text-lg w-[400px] ${condition}`}>{description}</div>
                <div className="text-2xl text-black">${price}</div>
            </div>
        </div>
    );
};

export default ProductCard;
