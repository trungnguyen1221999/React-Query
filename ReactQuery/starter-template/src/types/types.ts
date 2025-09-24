export interface Student {
  id: number
  avatar: string
  last_name: string
  email: string
}

export interface AllInformationStudent extends Student {
  gender: 'Other' | 'Male' | 'Female' | ''
  first_name: string
  country: string
  address: string
}
