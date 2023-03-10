import axios from 'axios';

export const getPostalCodeCoordinates = async (postalCode: String): Promise<any> => {
  const BASE_URL = 'https://geocoder.ca/';
  const url = `${BASE_URL}?locate=${postalCode}&geoit=XML&json=1`;
  const response = await axios.get(url);
  const results = response.data;
  return results;
};
