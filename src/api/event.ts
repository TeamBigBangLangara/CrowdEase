import { Event} from "../types/types";
import { env } from "../../env";


const baseURL = 'https://app.ticketmaster.com/discovery/v2/';

export const getEvents = () => {
  return fetch(`${baseURL}/events.json?dmaId=528&apikey=${env.REACT_EVENTS_APIKEY}`)
    .then((res) => res.json())
    .then((data) => {
        const res2 = JSON.parse(JSON.stringify(data._embedded.events));
        const events: Event[] = res2.map((response: any) => {
          return {
            id: response.id,
            name: response.name,
            image: response.images[0].url,
            dates: {
              date: response.dates.start.localDate,
              time: response.dates.start.localTime,
            },
            category: {
              id: response.classifications[0].segment.id,
              name: response.classifications[0].segment.name,
            },
            location: {
              longitude: response._embedded.venues[0].location.longitude,
              latitude: response._embedded.venues[0].location.latitude,
            },
            venue: {
              name: response._embedded.venues[0].name,
              id: response._embedded.venues[0].id,
              type: response._embedded.venues[0].type,
            },
            address: response._embedded.venues[0].address.line1,
            participants: Math.floor(Math.random() * (12200 - 2200 + 1)) + 2200,
          };
        });
        return events;
      }
    );
};

export const getEventById = (id: string) => {
  return fetch(`${baseURL}events/${id}?apikey=${env.REACT_EVENTS_APIKEY}`)
    .then((res) => {return res.json();})
    .then((data) => {
        const response = JSON.parse(JSON.stringify(data));
        const event: Event = {
            id: response.id,
            name: response.name,
            image: response.images[0].url,
            dates: {
              date: response.dates.start.localDate,
              time: response.dates.start.localTime,
            },
            category: {
              id: response.classifications[0].segment.id,
              name: response.classifications[0].segment.name,
            },
            location: {
              longitude: response._embedded.venues[0].location.longitude,
              latitude: response._embedded.venues[0].location.latitude,
            },
            venue: {
              name: response._embedded.venues[0].name,
              id: response._embedded.venues[0].id,
              type: response._embedded.venues[0].type,
            },
            address: response._embedded.venues[0].address.line1,
            participants: Math.floor(Math.random() * (12200 - 2200 + 1)) + 2200,
          };
        return event;
      }
    );
};
