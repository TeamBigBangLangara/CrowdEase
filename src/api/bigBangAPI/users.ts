import project from "./baseURL";
import { storage } from "../../store/mmkv";

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${storage.getString('FirebaseJWT')}`,
  });

export const requestUsers = async () => {
    return await project.get(`/user/all`, {
        headers: getHeaders(),
      }).then((res) => {
        return res.data;
    });
};

export const addUser = async(email:string, UUID:string, userName: string) => { 
    const postData = {
            email: email,
            UID: UUID,
            user_name: userName,
    };

    await project.post('/user', postData,  {
        headers: getHeaders(),
      }).then((res) => {
    console.log( res.status);
    });
};
