import {Dimensions} from 'react-native';

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;
export const mainWidth = screenWidth - 30;
export const childWidth = screenWidth - 100;

export const colorBlue = '#10226D';

export const fontSizeBody = 17;

export const androidMarginTop = {
  android: {marginTop: 35},
};

export const shadowDefault = {
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  android: {
    elevation: 2.5,
  },
};
