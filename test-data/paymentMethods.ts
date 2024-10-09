import { faker } from "@faker-js/faker"

export type CreditCardDetails = {
  cardNumber: string
  expirationDate: string
  cvv: number
  cardHolderName: string
}

function generateCreditCardExpiry() {
  // '11/2030'
  return (faker.date.future()).toLocaleDateString('en-GB', {
    month: '2-digit',
    year: 'numeric'
  }).split(' ').join('/')
}

export const creditCardDetails: CreditCardDetails = {
  cardNumber: faker.finance.creditCardNumber('####-####-####-###L'),
  expirationDate: generateCreditCardExpiry(),
  cvv: faker.number.int({ min: 100, max: 999 }),
  cardHolderName: `${faker.string.alpha(6)} ${faker.string.alpha(6)}`
}