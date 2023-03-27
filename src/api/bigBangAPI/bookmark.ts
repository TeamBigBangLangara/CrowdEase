import { AxiosRequestConfig } from "axios";
import { Bookmark } from "types/types";
import project from "./baseURL";


export const addBookmark = async(postData: Bookmark) : Promise<any> => { 
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
