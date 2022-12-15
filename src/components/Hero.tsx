import React from 'react'

const Hero = () => {
  return (
    <section className='md:h-screen flex md:flex-row  w-screen bg-slate-100 overflow-x-hidden overflow-y-hidden flex-col-reverse mt-0'>
      <div className='md:w-[50vw] w-full flex flex-col items-start justify-center p-12 gap-5 mt-0'>
        <h3 className='md:text-6xl text-3xl text-gray-800'>Plants Gonna Make People Happy</h3>
        <p className='text-gray-600 text-xl'>We will give you full of love from natural of this planet</p>
        <button className="bg-green-600 text-white py-3 px-10 rounded-md">Shop Now</button>
      </div>
      <div className='md:w-[50vw] w-screen '>
        <img src="https://media.newyorker.com/photos/5b916c145803be2dae346a88/1:1/w_1706,h_1706,c_limit/Ciccone-Houseplants-Judging-You.jpg" alt="houseplant" className='w-fit'/>
      </div>
    </section>
  )
}

export default Hero