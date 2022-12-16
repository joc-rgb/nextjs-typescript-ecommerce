/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe'
import { CartItemInterface } from 'utils/Interfaces';

const key: string = process.env.STRIPE_SECRET_KEY || ""
const stripe = new Stripe(key, {
	apiVersion: "2022-11-15",
})

export default async (req: NextApiRequest,
	res: NextApiResponse<any>) => {

	if (req.method === 'POST') {
		const { items, email } = req.body;
		console.log(items);
		const params: Stripe.Checkout.SessionCreateParams = {
			submit_type: "pay",
			mode: "payment",
			payment_method_types: ["card"],
			shipping_options: [{ shipping_rate: "shr_1MCgsaGWVm9zXuLH1nBDnC0Q" }],
			shipping_address_collection: { allowed_countries: ['US', 'CA', 'MY', 'SG'] },
			line_items: items.map((item: CartItemInterface) => {
				const img = item.addImg[0];
				return {
					price_data: {
						currency: "usd",
						product_data: {
							name: item.name,
							images: [img],
						},
						unit_amount: parseFloat(item.price[0]) * 100,
					},
					adjustable_quantity: {
						enabled: true,
						minimum: 1,
					},
					quantity: item.quantity,
				};
			}),
			success_url: `${req.headers.origin}/success`,
			cancel_url: `${req.headers.origin}/`,
			metadata: {
				email,

			}
		};

		try {

			const session = await stripe.checkout.sessions.create(params);
			res.status(200).json(session);
		} catch (err) {
			console.log(err)
			return res.status(500).json({
				message: "Something went wrong!! Please try again after sometime",
			});
		}
	}

}