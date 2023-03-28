import OneSignal from 'react-native-onesignal';
import axios from 'axios';

const ONESIGNAL_APP_ID = 'ee944c2a-c447-402c-9f22-48dbdddb9caa';
const REST_API_KEY = 'MWRhOWE2N2EtNjljYS00NDM2LTg3M2MtMzYzYmEzOWM5NGMz';
OneSignal.setAppId(ONESIGNAL_APP_ID);

export const createNotification = async(date: string, notificationData: string, eventImage: string) : Promise<any> => {

  try {
    const deviceState = await OneSignal.getDeviceState();
    if (!deviceState || !deviceState.userId) {
      throw new Error('Unable to get device ID');
    }
    const playerId = deviceState.userId;
    console.log('Player ID:', playerId);
    //const eventDate = new Date(Date.now() + 0.5 * 60 * 1000);
    const eventDate = new Date(date);
    const eventNotificationMessage = `Your bookmarked event: ${notificationData} is happening now`;
    const eventTitle = notificationData ;
    console.log("Event Time is: " + eventDate);
    const options = {
      method: 'POST',
      url: 'https://onesignal.com/api/v1/notifications',
      headers: {
        accept: 'application/json',
        Authorization: `Basic ${REST_API_KEY}`,
        'content-type': 'application/json',
      },
      data: {
        app_id: ONESIGNAL_APP_ID,
        include_player_ids: [playerId],
        contents: { en: `${eventNotificationMessage}`, },
        headings: { en: `${eventTitle}`, },
        big_picture: eventImage,
        send_after: eventDate.toISOString(),
      },
    };
    const response = await axios.request(options);
    console.log('Notification sent:', response.data);
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
        params: {app_id: `${ONESIGNAL_APP_ID}`,},
        headers: {accept: 'application/json', Authorization:  `Basic ${REST_API_KEY}` ,},
      };
      
    const response = axios.request(options);
    console.log('Notification cancelled:');
    return response;
};