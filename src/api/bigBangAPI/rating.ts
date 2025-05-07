import project from "./baseURL";
import { Rating } from "../../types/types";
import { storage } from "../../store/mmkv";

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${storage.getString('FirebaseJWT')}`,
});

export const addRating = (postData: Rating) => {
  return project.post("/rating", postData, {
    headers: getHeaders(),
  }).then((res) => {
    return res.data;
  });
};

export const getEventRatedByUser = (user_id?: string) => {
  return project.get(`/rating/user/${user_id}`, {
    headers: getHeaders(),
  }).then((res) => {
    return res.data;
  });
};
