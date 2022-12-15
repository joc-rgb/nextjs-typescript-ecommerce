import React from 'react'
import {HiChat} from 'react-icons/hi'
import {IoIosCall} from 'react-icons/io'

import Layout from '@/components/layout/Layout'

const Contact = () => {
  return (
    <Layout>
    <section className='flex flex-col items-center justify-center'>
        <p className="font-normal text-green-700 text-3xl mt-10">Contact</p>
        <div className='flex '>
          <p>Need to get in touch with us? Feel free to reach us via call or live chat.</p>
        </div>
        <div className="flex m-16 gap-10">
          <div className="flex items-center justify-center w-96 bg-slate-50 p-10 flex-col gap-1">
            <IoIosCall className='text-4xl text-gray-800' />
            <p className='font-bold'>Talk to Support</p>
            <p className='text-gray-600 font-normal text-md'>Call our friendly suppport team for any inquiries. Don't worry, we're here for you.</p>
            <p className="font-bold text-green-600"> 1-877-453-1304</p>
          </div>
          <div className="flex items-center justify-center w-96 bg-slate-50 p-10 flex-col gap-1">
            <HiChat className='text-4xl text-gray-800' />
            <p className='font-bold'>Live Chat</p>
            <p className='text-gray-600 font-normal text-md'>Live chat with our friendly customer support to solve your inquiries less than 5 minutes.</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Contact