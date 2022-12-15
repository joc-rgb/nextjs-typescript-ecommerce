import { Splide, SplideSlide } from '@splidejs/react-splide'
import { GetStaticPropsContext } from 'next'
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { addToCart } from 'redux/cartSlice'
import { setProductItems } from 'redux/productSlice'
import { getAllItems, queryItems } from 'utils/firebaseFunction'
import { ProductInterface } from 'utils/Interfaces'
import '@splidejs/react-splide/css/sea-green';

import Layout from '@/components/layout/Layout'
import ProductCard from '@/components/ProductCard'


const ProductDetails = ({ item }: { item: ProductInterface }) => {
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(1)
  const [total, setTotal] = useState("0.00")
  const [addOn, setAddOn] = useState("0.00")
  const [currentImg, setCurrImg] = useState(0)
  
  const dispatch = useDispatch()
  const products = useSelector((state: any) => state.product.productItems)
  const cartItem = useSelector((state: any) => state.cart)
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      console.log({ ...item, quantity, size, total })
    dispatch(addToCart({ ...item, quantity }))
    toast.success("Item added to cart successfully",{
    toastId: 'success',
})
;

      console.log(cartItem)
    }

    useEffect(() => {
      calculateTotal()
    }, [size, addOn, quantity])
  
  useEffect(() => {
  async function fetchData() {
    // You can await here
    if (products.length == 0){
      const products = await getAllItems()
      console.log("fetching...")
      dispatch(setProductItems(products));
    }
    // ...
  }
  fetchData();
}, [products]); 
  
  
   /** const calculateAddOn = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
      console.log(e.target.checked)
      if (e.target.checked) {
        setAddOn((parseFloat(addOn) + 3.99).toFixed(2))
        setAddon((prev) => [...prev, { id: id, name: id == 0 ? "extra cheese" : "extra pepperoni" }])
      }
      else {
        setAddOn((parseFloat(addOn) - 3.99).toFixed(2))
        setAddon(addon.filter((a) => a.id !== id));
      }
    } */

    const calculateTotal = () => {
      console.log(quantity)
      if (item.variable.length <= 1) {
        setTotal(((parseFloat(item.price[0]) + parseFloat(addOn)) * quantity).toFixed(2))
      }
    }

    return (
      <Layout>
    
        <ToastContainer />
      <div className="flex h-full p-16 w-screen justify-center overflow-hidden overflow-x-hidden">
          <section className="flex flex-col">
            <img src={item.addImg[currentImg]} className="w-72 h-72 object-cover rounded-md" />
            <div className="flex gap-5 my-5">
              {item.addImg.map((i, index) => <img src={item.addImg[index]} key={index} alt="" className={`w-12 h-12 cursor-pointer rounded-sm ${currentImg===index&& 'border-green-800 border-2'}`} onClick={()=>setCurrImg(index)} />)}
            </div>
          </section>
          <section className="flex flex-col w-[50vw] pl-16 gap-3">
            <p className="font-bold text-xl text-green-500">{item.category}</p>

            <p className="font-bold text-5xl text-black">{item.name}</p>
            <p className='text-gray-700 text-md pt-5 w-[90%]'>{item.desc}</p>
            <p className="text-3xl font-bold mt-4">${total}</p>
           
          
            <div className="flex items-center">
              <p className="font-bold text-green-400 text-3xl px-4 cursor-pointer" onClick={() => { if (quantity <= 1) return; setQuantity(quantity - 1); calculateTotal() }}>-</p>
              <p className="font-bold text-gray-700 text-xl p-4 py-2 border b-slate-800">{quantity}</p>
              <p className="font-bold text-green-400 text-3xl px-4 cursor-pointer" onClick={() => { setQuantity(quantity + 1); calculateTotal() }}>+</p>
              <button className='mx-4 bg-green-600 px-10 py-4 text-white font-bold rounded-md shadow-md' onClick={e => handleClick(e)}>Add To Cart</button>
            </div>
            
          </section>
        </div>
        <section className='mt-16 items-center text-center flex flex-col'>   
        <p className="text-3xl text-green-600">Related Products</p>
        <div className="flex flex-wrap flex-row w-5/6 justify-center items-center overflow-x-hidden"><Splide  options={ { perPage:6 } }
          aria-labelledby="reactivity-example-heading" >
          {products.filter((i:ProductInterface)=>i.category.includes(item.category)).map((i:ProductInterface) => <SplideSlide key={i.id}><ProductCard  i={i} /></SplideSlide>)}
        </Splide></div>
        </section>
      </Layout>
    )
  }


  export default ProductDetails

  export async function getStaticPaths() {
    const products = await getAllItems()

    const paths = products.map((product) => ({
      params: {
        slug: product.slug
      }
    }))
    
    return {
      paths,
      fallback: 'blocking'
    }
  }
export const getStaticProps = async ({ params }: GetStaticPropsContext<{ slug: string}>) => {
  const items = await queryItems("slug", params?.slug)
  
    const item = items[0]
    console.log("Item: ", item)
    return {
      props: {
        item,
     
      },
    }
  }
