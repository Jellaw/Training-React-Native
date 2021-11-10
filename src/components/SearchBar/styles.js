import colors from '~/assets/colors';
import PlatformStyleSheet from '~/helpers/PlatformStyleSheet';

export default PlatformStyleSheet.create({
  inputSearch: {
    backgroundColor: colors.white,
    paddingVertical: 0,
    borderWidth: 2,
    height: 56,
    borderRadius: 14,
    borderColor: '#E9EAF0',
    paddingLeft: 16,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputSearchContent: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingLeft: 15,
    paddingRight: 10,
  },
});
