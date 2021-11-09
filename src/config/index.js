// import { Platform } from 'react-native';

// import {
//   IOS_ANALYTICS_KEY,
//   ANDROID_ANALYTICS_KEY,
//   API_URL,
//   TOKEN_KEY,
// } from 'react-native-dotenv';

export const localeDatePicker = {
  lang: {
    yearFormat: 'YYYY',
    dateFormat: 'M/D/YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'M/D/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
  },
  dateFormat: 'YYYY-MM-DD',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
  dateTimesFormat: 'YYYY-MM-DD HH:mm',
  weekFormat: 'YYYY-wo',
  monthFormat: 'YYYY-MM',
};

// export default {
//   API_URL,
//   TOKEN_KEY,
//   ANALYTICS_KEY: Platform.select({
//     ios: IOS_ANALYTICS_KEY,
//     android: ANDROID_ANALYTICS_KEY,
//   }),
// };

export const ASSET_URL = 'http://54.66.88.247:8000';
export default {
  API_URL: 'https://apis.safe-tdevice.com',
  TOKEN_KEY: 'safet.com.token',
};
