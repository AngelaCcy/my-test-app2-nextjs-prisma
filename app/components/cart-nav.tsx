"use client";

import { ShoppingCart } from 'lucide-react';
import { useState } from "react"
import Drawer from "./Drawer";
import Cart from "./cart/Cart";
import useFromStore from '@/hooks/useFromStore';
import { useCartStore } from '../stores/useCartStore';


export default function CartNav() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    // 傳入useCartStore hook, 以及要取的status 參數值, 可取回目前cart內容
    const cart = useFromStore(useCartStore, state => state.cart)
    const handleCartIconClick = () => {
		setIsDrawerOpen(!isDrawerOpen)
	}
    return (
        <div className='pr-5 pt-1'>
            <div className='relative'>
                <button
                    type='button'
                    title='Mini Cart'
                    className='text-white text-xl flex items-center'
                    onClick={handleCartIconClick}
                >
                    <ShoppingCart className='text-black'/>
                    <div className='absolute -top-3 -right-3 text-white rounded-full bg-red-600 w-5 h-5 text-sm -ml-1'>{cart?.length}</div>
                </button>
            </div>
            <Drawer isOpen={isDrawerOpen} onCartIconClick={handleCartIconClick}>
                <Cart />
            </Drawer>
        </div>
    )    
}
