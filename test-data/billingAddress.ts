import { faker } from '@faker-js/faker'

export type BillingAddress = {
  address: string
  city: string
  state: string
  country: string
  postcode: string
}

export const countryList = ['AL', 'AX', 'DZ', 'AU', 'NZ', 'PH', 'PE', 'ML', 'MV', 'GB', 'US', 'UY', 'UZ', 'MQ', 'MR', 'MU']

export function generateRandomBillingAddress(): BillingAddress {
  return {
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.helpers.arrayElement(countryList),
    postcode: faker.location.zipCode()
  }
}
