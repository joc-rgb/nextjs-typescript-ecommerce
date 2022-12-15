import {useEffect} from "react"
import { useSelector } from 'react-redux';

import CartModal from '@/components/CartModal';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import NewsLetter from "@/components/Newsletter";


export default function Layout({ children }: { children: React.ReactNode }) {
   const cartShow = useSelector((state: any) => state.cart.cartShow)
  useEffect(() => { console.log(cartShow); }, [cartShow]);
  return <><Header/> {cartShow?(<CartModal />):<></>}{children}<NewsLetter /><Footer /></>;
}
