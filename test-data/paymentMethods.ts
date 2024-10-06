export type CreditCard = {
  cardNumber: string
  expirationDate: string
  cvv: string
  cardHolderName: string
}

export const creditCard: CreditCard = {
  cardNumber: '4111-1111-1111-1111',
  expirationDate: '11/2030',
  cvv: '123',
  cardHolderName: 'Test First Name Test Last Name'
}