import moment from 'moment'
import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import React from 'react'
import { getUserOrders } from 'utils/firebaseFunction'
import { OrderInterface } from 'utils/Interfaces'

import Layout from '@/components/layout/Layout'

const MyOrders = ({ ordersInfo }: { ordersInfo: OrderInterface[] }) => {
  const { data: session, status } = useSession()
console.log(ordersInfo)
  return (
    <Layout>
      <section className='flex flex-col p-20'>
        <p className="text-3xl text-green-600">My Orders</p>
        {ordersInfo.map((i, index) => <p key={index}>{ i.amount}</p>)}
      </section>
    </Layout>
  )

}

export default MyOrders

// Tells nextJS that's no longer a static page
// eg "Please calculate smthg and send it to the user next"
// Here, it's executed by Node.js
export async function getServerSideProps(context: GetSessionParams | undefined) {
  // Get the user logged in credentials...
    const session = await getSession(context);

    if (!session) {
        return { props: {} };
    }

  const orders = await getUserOrders(session?.user?.email || "")
 const ordersInfo = await Promise.all(
        orders.map(async (order) => ({
            id: order.id,
            amount: order.amount,
            amountShipping: order.amount_shipping,
            images: order.images,
            timestamp:moment(order.timestamp.toDate()).unix()
        }))
    );
  return {
    props: {ordersInfo}, // will be passed to the page component as props
  }
}