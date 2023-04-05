import db from "../../../db.json";

export const getEvents = async () => {
  return db.events;
};
