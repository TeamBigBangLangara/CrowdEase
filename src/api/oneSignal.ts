import OneSignal from 'react-native-onesignal';
import axios from 'axios';
// import { REACT_ONESIGNAL_APP_ID, REACT_ONESIGNAL_REST_API_KEY } from "@env";
import { env } from "../../env";

OneSignal.setAppId(env.REACT_ONESIGNAL_APP_ID);

export const createNotification = async(date: string, eventID:string, notificationData: string, eventImage: string) : Promise<any> => {

  try {
    const deviceState = await OneSignal.getDeviceState();
    if (!deviceState || !deviceState.userId) {
      throw new Error('Unable to get device ID');
    }
    const playerId = deviceState.userId;
    const eventDate = new Date(Date.now() + 0.1 * 60 * 1000);
    // const eventDate = new Date(date);
    const eventNotificationMessage = `Your bookmarked event: ${notificationData} is happening now`;
    const eventTitle = notificationData ;
    const options = {
      method: 'POST',
      url: 'https://onesignal.com/api/v1/notifications',
      headers: {
        accept: 'application/json',
        Authorization: `Basic ${env.REACT_ONESIGNAL_REST_API_KEY}`,
        'content-type': 'application/json',
      },
      data: {
        app_id: env.REACT_ONESIGNAL_APP_ID,
        include_player_ids: [playerId],
        contents: { en: `${eventNotificationMessage}`, },
        headings: { en: `${eventTitle}`, },
        big_picture: eventImage,
        data: {"eventID":eventID,},
        send_after: eventDate.toISOString(),
      },
    };
    const response = await axios.request(options);
    return response.data.id;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

export const cancelNotification = (notificationId:string): Promise<any>  => {
    console.log("Notification ID canceled" + notificationId);
    const options = {
        method: 'DELETE',
        url: `https://onesignal.com/api/v1/notifications/${notificationId}`,
        params: {app_id: `${env.REACT_ONESIGNAL_APP_ID}`,},
        headers: {accept: 'application/json', Authorization:  `Basic ${env.REACT_ONESIGNAL_REST_API_KEY}` ,},
      };
    const response = axios.request(options);
    return response;
};
