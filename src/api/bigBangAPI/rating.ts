import { AxiosRequestConfig } from "axios";
import project from "./baseURL";


export const addRating = async(postData: {user_id?:string, event_id?:string, category?:string, rate?:number}) : Promise<any> => { 

    console.log(postData);
    const res = await project.post('/rating', postData);
    return res.data._id;
};

//updateRating


export const getRating = async(user_id?:string) : Promise<any> => { 

    return await project.get(`/rating/user/${user_id}`).then((res) => {
        return res.data;
    });
};
