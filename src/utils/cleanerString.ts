type TType = 'onlyNumber'

export const cleanerString = (value: string, type?: TType) => {
  switch (type) {
    case 'onlyNumber':
      return value.replace(/\D+/g, '')
    default:
      return value
  }
}