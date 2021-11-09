import PlatformStyleSheet from '~/helpers/PlatformStyleSheet';
import colors from '~/assets/colors';
import {screenWidth} from '~/config/commonStyle';

export default PlatformStyleSheet.create({
  notiBody: {
    minHeight: 50,
    width: screenWidth,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    position: 'absolute',
    zIndex: 99,
    right: 0,
    bottom: 0,
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
