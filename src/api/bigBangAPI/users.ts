import project from "./baseURL";
import { storage } from "../../store/mmkv";

export const requestUsers = async () => {
    return await project.get(`/user/all`).then((res) => {
        return res.data;
    });
};

export const addUser = async(email:string, UUID:string, userName: string) => { 
    const postData = {
            email: email,
            UID: UUID,
            user_name: userName,
    };

    await project.post('/user', postData).then((res) => {
    console.log( res.status);
    });
};
