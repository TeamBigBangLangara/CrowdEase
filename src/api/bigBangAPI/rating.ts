import project from "./baseURL";
import { Rating } from "../../types/types";
import { storage } from "../../store/mmkv";

export const addRating = (postData: Rating) => {
  return project.post("/rating", postData).then((res) => {
    return res.data;
  });
};

export const getEventRatedByUser = (user_id?: string) => {
  return project.get(`/rating/user/${user_id}`).then((res) => {
    return res.data;
  });
};
