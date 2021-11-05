import colors from '~/assets/colors';
import fonts from '~/assets/fonts';
import PlatformStyleSheet from '~/helpers/PlatformStyleSheet';

export default PlatformStyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: '10%',
    paddingHorizontal: '5%',
  },
  titleHead: {
    fontWeight: '700',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
  },
  btnLogin: {
    marginTop: 20,
  },
  btnLink: {
    ...fonts.type.bold(15, colors.grey),
  },
});
