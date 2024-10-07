import { faker } from '@faker-js/faker';

export type RegistrationDetails = {
  firstName: string
  lastName: string
  dateOfBirth: Date
  address: string
  postcode: string
  city: string
  state: string
  country: string
  phone: string
  email: string
  password: string
}

export const countryList = ['Albania', 'Turkey', 'Peru', 'Australia', 'New Zealand']

export function generateRandomRegistrationDetails(): RegistrationDetails {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateOfBirth: faker.date.birthdate({ mode: 'age', min: 18, max: 74 }),
    address: faker.location.streetAddress(),
    postcode: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.helpers.arrayElement(countryList),
    phone: faker.string.numeric(),
    email: `a${faker.string.alphanumeric()}@example.fakerjs.dev`,
    password: faker.internet.password({ prefix: '!Aa0' }),
  }
}