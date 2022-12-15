/* eslint-disable unused-imports/no-unused-vars */
import { Splide, SplideSlide } from '@splidejs/react-splide';
import {useState} from 'react'
import { ToastContainer } from 'react-toastify';
import { ProductInterface } from 'utils/Interfaces';
import '@splidejs/react-splide/css/sea-green';

import ProductCard from '@/components/ProductCard'



const Trending = ({ item }: { item: ProductInterface[] }) => {
  const [ gap, setGap ] = useState(20);
  const [ perPage, setPerPage ] = useState(1);
  const [ height, setHeight ] = useState( 10 );
  return (
    <section className='mt-16 items-center text-center flex flex-col w-screen'>
    <ToastContainer />
      <p className="text-3xl text-green-600">Trending</p>
      <div className="flex flex-wrap flex-row  max-w-lg p-4 justify-center items-center "><Splide options={{
        perPage: 4,
        breakpoints: {
    
		1000: {
			perPage: 1,
		},
  },  gap, width:'100vw' } }
        aria-labelledby="reactivity-example-heading" >
        {item.filter(i=>i.tag.includes("trending")).map((i) => <SplideSlide key={i.id}><ProductCard  i={i} /></SplideSlide>)}
      </Splide></div>
        
    </section>

  )
}

export default Trending