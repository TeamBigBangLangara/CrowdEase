export const timeFormat = (time: string) => {
 const timeStr = time;

// Split time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = timeStr.split(':');

// Convert string to Date object
  const timeObj = new Date();

  timeObj.setHours(Number(hours));
  timeObj.setMinutes(Number(minutes));
  timeObj.setSeconds(Number(seconds));

// Format Date object to HH:MM AM/PM format
  const formattedTime = timeObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, });

  return formattedTime;
};
