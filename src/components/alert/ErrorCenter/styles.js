import PlatformStyleSheet from '~/helpers/PlatformStyleSheet';
import colors from '~/assets/colors';

export default PlatformStyleSheet.create({
  errorBody: {
    minHeight: 50,
    backgroundColor: 'orange',
    width: 250,
    alignItems: 'center',
    paddingLeft: 10,
    position: 'absolute',
    zIndex: 2,
    flexDirection: 'row',
    right: 0,
    top: 10,
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
