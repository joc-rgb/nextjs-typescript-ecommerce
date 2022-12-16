import * as admin from "firebase-admin";
import { ServiceAccount } from 'firebase-admin';
import { buffer } from 'micro'
import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next'
import { serviceAccount } from 'permission';
import Stripe from 'stripe';

//Initialize Firebase App//
const app = !admin.apps.length
    ? admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as ServiceAccount),
      })
  : admin.app();
  
const key: string = process.env.STRIPE_SECRET_KEY || ""
const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET || ""
const endpointSecret = process.env.STRIPE_SIGNING_SECRET||"";
const stripe = new Stripe(key, {
    apiVersion: "2022-11-15",
})

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

const fulfillOrder = async (session: any) => {
  console.log("Fulfilling order", session);
  
  const images = JSON.parse(session?.metadata?.images||"").map((image:string) =>
        JSON.stringify(image)
    ) 
    console.log(images)
  return app.firestore()
    .collection("customers")
    .doc(session?.metadata?.email || "")
    .collection("orders")
    .doc(session.id)
    .set({
      id: session.id,
      amount: (session?.amount_total||0 )/ 100,
      amount_shipping: (session?.total_details?.amount_shipping || 0) / 100,
      timestamp: admin?.firestore.FieldValue.serverTimestamp(),
      images: images,
    })
    .then(() => {
      console.log(
        `SUCCESS: Order ${session.id} had been added to the DB`
      );
    })
    .catch((err) => console.log("Error: ", err.message));
}

export default async (req:NextApiRequest, res:NextApiResponse) => {
    if (req.method === 'POST') {
        const requestBuffer = await buffer(req)
        const payload = requestBuffer.toString()
        const sign = req.headers["stripe-signature"]

        let event;
        
        //Verify event comes from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sign||"", endpointSecret)
        
        } catch (err: any) {
            console.log("ERROR: ",err.message)
            return res.status(400).send(`Webhook error: ${err.message}`)
        }

        //Handle checkout session
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object
       
            //Fulfill order
            return fulfillOrder(session).then(() => res.status(200)).catch((err)=>res.status(400).send(`Webhook error: ${err.message}`))
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}