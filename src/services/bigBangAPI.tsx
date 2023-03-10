import axios from 'axios';

const BASE_URL = 'http://crowdease.wmdd4950.com';


export const getUsers = async () => {
    const url = `${BASE_URL}/user/all`;
    console.log(url);
    const response = await axios.get(url);
    const results = response.data;
    return results;
};

export const postUser = async (email: string) => {

    const postUserUrl= `${BASE_URL}/user`;
    const UID='PS112';
    const user_name='';
    console.log("In Post user!"+ postUserUrl);
 
    const requestData = {
            email: email,
            UID: 'sd',
            user_name: 'ds2e',
    };
    console.log( requestData);
        // const response = await axios.post(`${BASE_URL}/user`, {
        //   email,
        //   UID,
        //   user_name,
        // });
        //console.log('Response Status' + response.status);

    axios.post(postUserUrl, requestData)
        .then(response => {
      console.log('Response is:', response.data);
        })
        .catch(error => {
        console.log('Error:', error.message);
     });
};