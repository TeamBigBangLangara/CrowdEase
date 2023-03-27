/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

import OneSignal from 'react-native-onesignal';
import axios from 'axios';

const ONESIGNAL_APP_ID = 'ee944c2a-c447-402c-9f22-48dbdddb9caa';

// OneSignal Initialization
OneSignal.setAppId(ONESIGNAL_APP_ID);

// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
OneSignal.promptForPushNotificationsWithUserResponse();

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(
  notificationReceivedEvent => {
    console.log(
      'OneSignal: notification will show in foreground:',
      notificationReceivedEvent,
    );
    let notification = notificationReceivedEvent.getNotification();
    console.log('notification: ', notification);
    const data = notification.additionalData;
    console.log('additionalData: ', data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  },
);

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log('OneSignal: notification opened:', notification);
});

OneSignal.getDeviceState().then(deviceState => {
  const playerId = deviceState.userId;
  console.log(playerId);
  const sendAfter = new Date(Date.now() + 1 * 60 * 1000);
  const options = {
    method: 'POST',
    url: 'https://onesignal.com/api/v1/notifications',
    headers: {
      accept: 'application/json',
      Authorization: 'Basic MWRhOWE2N2EtNjljYS00NDM2LTg3M2MtMzYzYmEzOWM5NGMz',
      'content-type': 'application/json'
    },
    data: {
      app_id:ONESIGNAL_APP_ID,
      include_player_ids: ["be03fb54-37f9-4c0a-88b1-3a597809e921"],
      contents: {en: 'Do be do be do', es: 'Spanish Message'},
      send_after: sendAfter.toISOString(),
    }
  };
  
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  // Store playerId in your local database or send it to your server
  });





AppRegistry.registerComponent(appName, () => App)
