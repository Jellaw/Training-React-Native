import PlatformStyleSheet from '~/helpers/PlatformStyleSheet';
import colors from '~/assets/colors';
import {screenWidth} from '~/config/commonStyle';

export default PlatformStyleSheet.create({
  errorBody: {
    minHeight: 50,
    backgroundColor: 'orange',
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    position: 'absolute',
    zIndex: 99,
    bottom: 0,
    flexDirection: 'row',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  errorText: {
    color: colors.white,
  },
  errorField: {
    color: colors.white,
    fontWeight: '700',
    marginRight: 5,
  },
});
