export type LoginAccount = {
  email: string
  password: string
  userType?: string
  name?: string
}

export const userCredentials = {
  'admin': {
    email: 'admin@practicesoftwaretesting.com',
    password: 'welcome01',
    userType: 'admin',
    name: ''
  } as LoginAccount,
  'customer': {
    email: 'customer@practicesoftwaretesting.com',
    password: 'welcome01',
    userType: 'customer',
    name: 'Jane Doe'
  } as LoginAccount,
}

export type AccountType = keyof typeof userCredentials