//Fill in the customer data object with default values and types

export const customerData = {
  firstName: 'Henrik',
  lastName: 'Hansson',
  email: 'info@askaheim.se',
  phone: '+46737077142',
  company: 'Askaheim Kakelugnsmakeri',
  websiteUrl: 'https://www.askaheim.se',
  siteName: 'Askaheim Kakelugnsmakeri',
  message: '',
  contactMessage: '',
  consent: false,
  contactIcon: '',
  contactImage: '',
  errors: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    consent: '',
  },
}
export type CustomerData = typeof customerData
export const initialCustomerData: CustomerData = {
  ...customerData,
}
