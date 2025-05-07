export const isBusinessNameValid = (businessName: string): boolean => {
  const re = /[a-zA-Z0-9]+/;
  return re.test(businessName);
};

//Reference: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
