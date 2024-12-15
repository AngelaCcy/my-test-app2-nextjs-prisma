import { z } from "zod";

// export interface Product {
//     id: number;
//     title: string;
//     price: number;
//     description: string;
//     category: string;
//     image: string | null;
// }
export const ProductSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  price: z.number().min(1, { message: "Price is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  image: z
    .string()
    .url({ message: "Image must be a valid URL" })
    .startsWith("https://", { message: "Image must start with https://" })
    .nullable(),
});

export type Product = z.infer<typeof ProductSchema>;

export interface SaleProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity?: number;
}

// https://fakestoreapi.com/
// export const FAKE_PRODUCT_DATA: Product[] = [
//     {
//         id: "1",
//         title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//         price: 109.95,
//         description:
//             "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//         category: "men's clothing",
//         image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     },
//     {
//         id: "2",
//         title: "Mens Casual Premium Slim Fit T-Shirts ",
//         price: 22.3,
//         description:
//             "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
//         category: "men's clothing",
//         image:
//             "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
//     },
//     {
//         id: "3",
//         title: "Mens Cotton Jacket",
//         price: 55.99,
//         description:
//             "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
//         category: "men's clothing",
//         image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
//     },
// ];

export type Direction = "ASC" | "DES";

// export function getAllProduct() {
//     return FAKE_PRODUCT_DATA;
// }

// 這使用到JS 的Array sort() method
export function sortByPrice(direction: Direction, data: Product[]) {
  return data.sort((a, b) => {
    if (direction === "ASC") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });
}

// // 這使用到JS 的Array find method
// export function getProductById(id: string) {
//     const product = FAKE_PRODUCT_DATA.find((product) => product.id === id);
//     return product || FAKE_PRODUCT_DATA[0];
// }

// 這使用到JS 的Array filter method
//includes為JS string method, 若包含某字串, 會return true
export function filterProductByTitle(query: string, data: Product[]) {
  return data.filter((el) =>
    el.title.toLowerCase().includes(query.toLowerCase()),
  );
}
