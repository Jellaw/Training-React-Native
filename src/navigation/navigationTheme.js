import {DefaultTheme} from '@react-navigation/native';
import colors from '~/assets/colors';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.light,
    background: colors.white,
    // card: colors.dark,
    text: colors.white,
    border: colors.lightgrey,
  },
};
