import React, { useEffect,useState } from 'react';
import { categories } from 'utils/data';
import { ProductInterface } from 'utils/Interfaces';

import ProductCard from '@/components/ProductCard'



const ProductList = ({ products, selected }: { products: ProductInterface[], selected: string | undefined }) => {
  const [currentSelection, setCurrentSelection] = useState("all")
  useEffect(() => {
    if (selected) {
      setCurrentSelection(selected)
    }
  },[selected])
  return (
    <section className="w-full flex flex-col justify-center items-center ">
      <div className="p-2 flex lg:gap-6 m-2 mx-auto self-center mb-10  gap-2 ">
        <div className={`rounded-full p-1 hover:text-green-400 font-normal flex text-center lg:p-2 lg:px-5 cursor-pointer ${currentSelection === 'all' && 'text-green-600'} ${currentSelection === 'all' && 'text-white'}`} onClick={() => setCurrentSelection('all')} ><p className=" ">All Products</p>
        </div>

        {categories && categories.map((c) => <div className={`rounded-full p-1 hover:text-green-400 font-normal  flex text-center lg:p-2 lg:px-5 cursor-pointer ${currentSelection === c.urlParamName && 'text-green-600'} ${currentSelection === c.urlParamName && 'text-white'}`} onClick={() => setCurrentSelection(c.urlParamName)} key={c.urlParamName}><p className=" " key={c.id}>{ c.name}</p></div>)}
      </div>
      <div className="flex flex-wrap flex-row w-full gap-16 p-4 justify-center items-center">{currentSelection=="all"? products.map((i) => <ProductCard key={i.id} i={i} />):
        products && products.length > 0 ? products.filter((i)=>i.category===currentSelection).map((i) => <ProductCard key={i.id} i={i} />) : <p>No products found</p>
      }
      </div>
    </section>
  )
}

export default ProductList