
import { setProductItems } from 'redux/productSlice';
import { wrapper } from 'redux/store';
import { getAllItems } from 'utils/firebaseFunction';
import { ProductInterface } from 'utils/Interfaces';

import CategoryList from '@/components/CategoryList';
import Featured from '@/components/Featured';
import Hero from '@/components/Hero';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Trending from '@/components/Trending';


/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export const getServerSideProps= wrapper.getServerSideProps(store => async ({ query })=> {
 
  const products = await getAllItems()

  store.dispatch(setProductItems(products));

    return {
        props: {
        products:products
        },
        
    }
})

export default function HomePage({ products }: { products: ProductInterface[] }) {


  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main className='overflow-hidden'>
        <section className='bg-white h-full'>
          {/* Hero */}
          
          <Hero />
          <Featured />
          <CategoryList />
          <Trending item={products}/>

        </section>
      </main>
    </Layout>
  );
}
 