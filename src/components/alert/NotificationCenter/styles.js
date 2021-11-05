import PlatformStyleSheet from '~/helpers/PlatformStyleSheet';
import colors from '~/assets/colors';

export default PlatformStyleSheet.create({
  notiBody: {
    minHeight: 50,
    width: 250,
    paddingLeft: 10,
    position: 'absolute',
    zIndex: 2,
    right: 0,
    top: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  notiTitle: {
    fontWeight: '700',
    color: colors.white,
  },
  notiText: {
    color: colors.white,
  },
  notiField: {
    color: colors.white,
    fontWeight: '700',
    marginRight: 5,
  },
});
