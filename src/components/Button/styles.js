import colors from '~/assets/colors';
import fonts from '~/assets/fonts';
import PlatformStyleSheet from '~/helpers/PlatformStyleSheet';

export default PlatformStyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 15,
    // width: '100%',
  },
  btnLogin: {
    ...fonts.type.bold(16, 'white'),
  },
  btnLink: {
    textDecorationLine: 'underline',
  },
});
