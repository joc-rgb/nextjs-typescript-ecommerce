import { useRouter } from 'next/router';
import React, {useEffect} from 'react'
import { TiTick } from "react-icons/ti";
import { useDispatch } from 'react-redux';
import { clearCart } from 'redux/cartSlice';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout'
const Success = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
        dispatch(clearCart([]));
  }, []);
  
  return (
    <Layout>
      <section className='flex p-8 flex-col gap-5 items-center justify-center'><p className="font-normal text-3xl my-8 text-green-700">Your order has been received</p><div className='rounded-full bg-green-600 text-3xl p-8'><TiTick className='text-white text-7xl ' />
      </div>
        <p className="text-xl">Thank you for your order. </p> <p className="text-lg">You'll receive an order confirmation email soon.</p>
        <Button onClick={()=>router.push('/product') }>Continue Shopping</Button>
      </section>
    </Layout>
  )
}

export default Success