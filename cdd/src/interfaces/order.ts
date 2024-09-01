export interface Order {
  customer: string,
  price: number,
  payment_method: string,
  status: string,
  items: [
    {
      agribusiness: string,
      products: [
        {
          name: string,
          price: number,
          weight: number
        }
      ]
    }
  ]
}