import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { motion } from "framer-motion"
import { useSession } from "next-auth/react";
import { BsArrowLeft } from "react-icons/bs"
import { GrClearOption } from "react-icons/gr"
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setCartShow } from "redux/cartSlice";

import CartItem from "@/components/CartItem";

const CartModal = () => {
   const { data: session } = useSession()
  const dispatch = useDispatch()
 const cartShow = useSelector((state: any) => state.cart.cartShow)
   const cartItems = useSelector((state: any) => state.cart.cartItems)
   const total = useSelector((state: any) => state.cart.total)
  const showCart = () => {
    dispatch(setCartShow(!cartShow));
  };


  //--Create Stripe Checkout Session--//
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY||"")
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    try {
      const checkoutSession = await axios.post("/api/checkout-sessions", {
        items: cartItems,
        email: session? session?.user?.email:'guest'
      })
      const res = await stripe?.redirectToCheckout({
        sessionId:checkoutSession.data.id
      })
      if (res?.error) {
      alert(res?.error.message)
    }
    } catch (err) {
      console.log(err)
    }
    }
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-[50%] h-screen bg-white z-[100] "
    >
      <div className="w-full flex justify-between items-center p-4">
        <motion.div whileTap={{ scale: 0.75 }} onClick={()=>showCart()}>
          <BsArrowLeft className="text-textColor text-3xl cursor-pointer" />
        </motion.div>
        <p className="text-lg font-bold text-textColor ">Cart</p>
        <motion.div whileTap={{ scale: 0.75 }} onClick={()=>dispatch(clearCart([]))}><GrClearOption className="cursor-pointer p-1 text-3xl bg-slate-200 rounded-full hover:shadow-lg" /></motion.div>
      </div>

      <div className="w-full h-full overflow-y-scroll scrollbar-none justify-between flex items-center flex-col p-2 pb-20 gap-3">
        {cartItems?.length > 0 ? (
          <>
            {cartItems.map((i:any) => (<CartItem key={i?.slug } item={i} />))}
            
            <div className="w-full flex-1 flex flex-col items-center px-2 py-2 justify-end">
              <div className="flex justify-between items-center w-full mb-4 font-bold px-2">
                <p className="font-semibold">Subtotal</p>
                <p className="">$ {total.toFixed(2)}</p>

              </div>
              <div className="flex justify-between items-center w-full mb-4 font-bold px-2">
                <p className="font-semibold">Shipping fees</p>
                <p className="">$ 8</p>

              </div>
              <div className="w-full border-b border-gray-400 my-2" />
              <div className="flex justify-between items-center w-full mb-6 font-bold px-2">
                <p className="font-semibold">Total</p>
                <p className="">$ {(parseFloat(total)+8).toFixed(2) }</p>

              </div>
             
              <motion.button onClick={() => { showCart(); createCheckoutSession() }} type="submit" role="link" whileTap={{ scale: 0.85 }} className="bg-green-600 text-white rounded-full w-full p-2 hover:shadow-lg font-bold">Checkout</motion.button>
            </div>
          </>
        ) : <p>No items in the cart currently</p>}
      </div>

    </motion.div>
  )
}

export default CartModal