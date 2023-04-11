import { Bookmark } from "types/types";
import project from "./baseURL";
import { storage } from "../../store/mmkv";

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${storage.getString('FirebaseJWT')}`,
  });

export const addBookmark = async(postData: Bookmark) : Promise<any> => {
    const res = await project.post('/bookmark', postData, {
        headers: getHeaders(),
      });
    return res.data._id;
};

export const removeBookmark = async(id:string) => {
    const url= `/bookmark/${id}`;
    const res = await project.delete(url, {
        headers: getHeaders(),
      });
};

export const fetchBookmarks = async(user_id?:string) : Promise<any> => {
        return await project.get(`/bookmark/user/${user_id}`,  {
            headers: getHeaders(),
            }).then((res) => {
            return res.data;
        });   
};
