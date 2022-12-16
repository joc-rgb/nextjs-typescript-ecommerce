import {AnimatePresence,motion } from "framer-motion"
import Link from 'next/link';
import { signIn, signOut,useSession } from "next-auth/react"
import { useState } from 'react';
import { FaBars,FaShoppingCart,FaUser } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { setCartShow } from 'redux/cartSlice';

import UnstyledLink from '@/components/links/UnstyledLink';

const links = [
  { href: '/', label: 'Home' },
  { href: '/product', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Header() {
  const { data: session, status } = useSession()
  const [isMenu, setIsMenu] = useState(false);
  const [isMobileNav, setMobileNav] = useState(false);
  const dispatch = useDispatch()
  const cartShow = useSelector((state: any) => state.cart.cartShow)
  const quantity = useSelector((state: any) => state.cart.quantity)
  const showCart = () => {
    console.log(cartShow)
    dispatch(setCartShow(!cartShow));
  };
  return (
    <header className='sticky top-0 z-50 bg-white shadow-lg'>
      <AnimatePresence>
        <div className='layout flex h-16 items-center justify-between'>
          <div className="p-2 border border-gray-700 rounded md:hidden cursor-pointer" onClick={() => setMobileNav(!isMobileNav)}>
            {isMobileNav?<RxCross2 />:<FaBars  />}
          </div>
        <UnstyledLink href='/' className='text-green-600 font-normal text-3xl hover:scale-105 '>
          GreenHouse
        </UnstyledLink>
        
        <nav>
            {isMobileNav && <motion.div initial={{ opacity: 0, scale: 0.6, x: -50 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.6, x: 0 }} className="absolute w-36 top-14 left-0 bg-white shadow-md text-gray-800 text-xs p-4">
              <ul className="gap-3">
              {links.map(({ href, label }) => (
              <li key={`${href}${label}`} className="p-3">
                <UnstyledLink href={href} className='hover:text-gray-600 text-center '>
                  {label}
                </UnstyledLink>
              </li>
            ))}</ul>
            </motion.div>}
            
          <ul className='md:flex items-center justify-between space-x-4 flex-row hidden md:visible'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className='hover:text-gray-600'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-x-8">
          <div className="flex items-center relative">
            <p className="absolute p-1 py-0 rounded-full bg-green-700 text-white text-xs -top-2 -right-2">{quantity}</p>
            <FaShoppingCart onClick={showCart} className="cursor-pointer text-2xl ml-8" />
         </div>
          <div className="cursor-pointer relative" onClick={() => {
                  setIsMenu(!isMenu)
                }}>
            <FaUser className='text-2xl'/>
            
            {isMenu &&
              (<motion.div initial={{ opacity: 0, scale: 0.6, y: 50 }} animate={{ opacity: 1, scale: 1, y:0 }} exit={{ opacity: 0, scale: 0.6, y:0 }} className="absolute w-36 top-11 right-0 bg-white shadow-md text-gray-800 text-xs ">
              <div className="flex flex-col">
                <p className="p-2">{session ? `Hello, ${session?.user?.name}` : 'Please login to continue'}</p>
                {session ? <> {session?.user?.email === 'jocxyen@gmail.com' && <Link href="/create"><p className='p-2 hover:text-orange-500'>Add New Product</p></Link>}<p className='p-2 hover:text-orange-500' onClick={(e) => {
                  e.preventDefault()
                  signOut()
                  }}>Sign Out</p>
                   
             </> :<p className='p-2 hover:text-orange-500' onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}>Login</p>}
                
              </div>
              </motion.div>)
            }
            
            
          </div>
        </div>
      </div>
      </AnimatePresence>
    </header>
  );
}
