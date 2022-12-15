import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { categories } from 'utils/data'


const CategoryList = () => {
  return (
    
    <section className="flex md:flex-row flex-col w-screen md:px-10 justify-around mt-16 items-center gap-3 md:gap-5"><AnimatePresence>
      {categories?.map(c=>(<motion.div  initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }} whileHover={{scale:1.05}} className=" w-[60vw] md:w-[30vw] relative flex flex-col text-center items-center cursor-pointer" key={c.urlParamName} >
        <p className='text-green-700 absolute text-2xl md:font-bold top-5 z-10'>{c.name}</p>
        <img src={c.catImg} alt={c.name} className='w-fit' />
      </motion.div>))}
      </AnimatePresence>
      </section>
    
  )
}

export default CategoryList