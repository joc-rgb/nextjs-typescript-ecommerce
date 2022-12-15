import { useRouter } from 'next/router'
import {useEffect,useState} from "react"
import { setProductItems } from 'redux/productSlice'
import { wrapper } from 'redux/store'
import { getAllItems } from 'utils/firebaseFunction'
import { ProductInterface } from 'utils/Interfaces'

import Layout from '@/components/layout/Layout'
import ProductList from '@/components/ProductList'



export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => { 
  const products = await getAllItems()
  store.dispatch(setProductItems(products));
  console.log("fetching for related products")
  console.log(products)
    return {
        props: {
        products:products
        },
        
    }
})

const Product = ({ products }: { products: ProductInterface[] }) => {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const router = useRouter()
    useEffect(() => {
    if (!router.isReady) return;
      const category = router.query.category?.toString()
      setSelected(category)
      console.log(selected)
  }, [router.isReady]);
  return (
    <Layout>
      <section className='flex flex-col items-center justify-center'>
      <p className='text-3xl mt-16'>Products</p>
        <ProductList products={products} selected={selected}  />
      </section>
    </Layout>
  )
}

export default Product