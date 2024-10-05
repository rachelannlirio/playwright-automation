export type ProductDetails = {
  productName: string
  unitPrice: number
  category: string
  brand: string
}

export type ProductToPurchase = {
  productDetails: ProductDetails
  desiredQuantity: number
}

export const productsToPurchase: ProductToPurchase[] = [{
  productDetails: {
    productName: 'Combination Pliers',
    unitPrice: 14.15,
    category: 'Pliers',
    brand: 'ForgeFlex Tools'
  } as ProductDetails,
  desiredQuantity: 3
},
{
  productDetails: {
    productName: 'Bolt Cutters',
    unitPrice: 48.41,
    category: 'Pliers',
    brand: 'MightyCraft Hardware'
  } as ProductDetails,
  desiredQuantity: 5
}]