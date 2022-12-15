import Link from 'next/link';
import React from 'react';
import { AiOutlineMinusCircle,AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addItemQuantity, removeItemQuantity } from 'redux/cartSlice';
import { CartItemInterface } from 'utils/Interfaces';


const CartItem = ({ item }: { item: CartItemInterface }) => {
  const dispatch = useDispatch()
  const updateQuantity = (type: number) => {
    type===0? dispatch(addItemQuantity({...item})):dispatch(removeItemQuantity({...item}))
  }
  return (
  <div className="w-full flex gap-2 bg-slate-100 rounded cursor-pointer hover:shadow-md">
    <Link href={`/product/${item.slug}`}><img src={item.addImg[0]} alt={item.name} className="w-28 h-28 " /></Link>
    <div className="flex flex-col flex-1 justify-center items-start">
      <p className="font-bold text-base text-cartItem">{item.name}</p>
      <p className="font-bold text-sm text-gray-700">$ { item.price}</p>
    </div>
    <div className="flex flex-1 gap-3 justify-center items-center text-xl">
      <AiOutlinePlusCircle className="text-2xl" onClick={()=>updateQuantity(0)}/>
      <p className="font-semibold">{item.quantity}</p>
      <AiOutlineMinusCircle className="text-2xl" onClick={()=>updateQuantity(1)}/>
    </div>
  </div>
);
}
export default CartItem;
