import db from "../../../db.json";

export const getEvents = async () => {
  return db.events;
};

export const getEventById = async (id: string) => {
  const events = await getEvents();
  return events.find((event) => event.id === id);
};
