export type LoginAccount = {
  email: string
  password: string
}

export const loginAccount = {
  'admin': {
    email: 'admin@practicesoftwaretesting.com',
    password: 'welcome01'
  } as LoginAccount,
  'customer': {
    email: 'customer@practicesoftwaretesting.com',
    password: 'welcome01'
  } as LoginAccount,
}

export type AccountType = keyof typeof loginAccount