export const isPostalCodeValid = (postalCode: string): boolean => {
  const re = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/

  return re.test(postalCode)
}
