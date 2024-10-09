import { faker } from '@faker-js/faker'
import { BillingAddress, countryList } from "./billingAddress"

export type AdminAccount = {
  loginAccount: LoginAccount
  personalDetails: PersonalDetails
}

export type CustomerAccount = {
  loginAccount: LoginAccount
  personalDetails: PersonalDetails
  billingAddress: BillingAddress
}

export type LoginAccount = {
  email: string
  password: string
  userType: 'customer' | 'admin'
  firstName: string
  lastName: string
}

export type PersonalDetails = {
  dateOfBirth?: Date
  phone?: string
}

export const userAccounts = {
  'admin': {
    loginAccount: {
      email: 'admin@practicesoftwaretesting.com',
      password: 'welcome01',
      userType: 'admin',
    } as LoginAccount,
    personalDetails: {
      firstName: 'John',
      lastName: 'Doe',
    }
  } as AdminAccount,
  'customer': {
    loginAccount: {
      email: 'customer@practicesoftwaretesting.com',
      password: 'welcome01',
      userType: 'customer',
      firstName: 'Jane',
      lastName: 'Doe',
    } as LoginAccount,
    personalDetails: {
      dateOfBirth: new Date('1980-02-02'),
      phone: ''
    } as PersonalDetails,
    billingAddress: {
      address: 'Test street 98',
      city: 'Vienna',
      state: '',
      country: 'Austria',
      postcode: ''
    }
  } as CustomerAccount,
}

export function generateRandomCustomerAccount() {
  return {
    loginAccount: {
      email: faker.internet.email({ firstName: faker.string.alpha({ length: 5 }), lastName: faker.string.numeric({ length: 3 }), provider: 'example.fakerjs.dev' }),
      password: faker.internet.password({ prefix: '!Aa0' }),
      userType: 'customer',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    } as LoginAccount,
    personalDetails: {
      dateOfBirth: faker.date.birthdate({ mode: 'age', min: 18, max: 74 }),
      phone: faker.string.numeric({ length: 10 }),
    } as PersonalDetails,
    billingAddress: {
      address: faker.location.streetAddress(),
      postcode: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.helpers.arrayElement(countryList),
    } as BillingAddress
  } as CustomerAccount
}

export type AccountType = keyof typeof userAccounts