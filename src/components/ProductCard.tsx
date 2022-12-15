import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import { addToCart } from 'redux/cartSlice';
import { ProductInterface } from 'utils/Interfaces';
import { stringToSlug } from 'utils/slugFunction';

import Button from '@/components/buttons/Button';

const ProductCard = ({ i }: { i: ProductInterface }) => {
  const dispatch = useDispatch()
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
    dispatch(addToCart({ ...i, quantity:1 }))
    toast.success("Item added to cart successfully", {
      toastId: 'success',
    });
  }
  
  return (
    
      <div className="relative max-w-sm w-80 h-370 rounded-xl shadow-lg bg-slate-100 gap-2 flex justify-center items-center flex-col pb-4 mb-2"><Link href={`/product/${stringToSlug(i.name)}`}><div className="flex flex-col  gap-2 justify-center items-center text-center h-420 rounded-md">
        <img src={i.addImg[0]} alt={i.name} className="object-cover w-full rounded-xl" />
        <div className="h-full pt-1 px-2 flex flex-col text-center items-center justify-center gap-1">
           <p className="font-normal pt-2"  >{i.name}</p>
       
          <p className="font-normal text-md">${i.price[0]}</p>
          
        </div>
      </div>  </Link>
      <div className="flex items-center justify-center">
       
        
        <Button variant='outline' onClick={e => handleClick(e)} > Add To Cart</Button>
      </div>
    </div>
  )
}

export default ProductCard