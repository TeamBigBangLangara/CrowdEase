import { AxiosRequestConfig } from "axios";
import project from "./baseURL";


export const addBookmark = async(postData: {user_id?:string, event_id?:string}) : Promise<any> => { 

    console.log(postData);
    const res = await project.post('/bookmark', postData);
    return res.data._id;
};


export const removeBookmark = async(id:string) => { 
    const url= `/bookmark/${id}`;
    const res = await project.delete(url);
};