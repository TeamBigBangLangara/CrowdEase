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


export const fetchBookmarks = async(user_id?:string) : Promise<any> => { 
    return await project.get(`/bookmark/user/${user_id}`).then((res) => {
        return res.data;
    });
};
