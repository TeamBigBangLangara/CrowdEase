import { Category } from "types/types";
import project from "./baseURL";

  export const addRating = async(postData: {
    user_id: string;
    event_id: string | undefined;
    category?: Category;
    rate: number;
  }) : Promise<any> => { 
    console.log('API request:', postData);
    const res = await project.post('/rating', postData);
    console.log('addRating response:', res.config.data);
    return res.config.data;
};

  export const getRating = async(user_id?:string) : Promise<any> => {
    return await project.get(`/rating/user/${user_id}`).then((res) => {
      console.log("return api",res);
        return res.data;
    });
  };


