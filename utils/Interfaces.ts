export interface ProductInterface {
  id: string,
  name: string,
  addImg:string[],
  price: string[],
  slug: string,
  tag: string,
  variable:string[],
  category: string,
  desc: string
}

export interface CartItemInterface {
  addImg: string[],
  category: string,
  desc: string,
  id: string,
  name: string,
  price: string[],
  variable: string[],
  slug: string,
  tag: string,
  quantity: number,
  total: string
}

export interface OrderInterface {
  id: string,
  amount: number,
  amountShipping: number,
  images: string[],
  timestamp: string
}
