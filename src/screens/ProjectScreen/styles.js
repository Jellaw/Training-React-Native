import colors from '~/assets/colors';
import PlatformStyleSheet from '~/helpers/PlatformStyleSheet';

export default PlatformStyleSheet.create({
  container: {},
  // tag: {
  //   backgroundColor: colors.blue,
  //   borderRadius: 6,
  //   height: 20,
  //   paddingHorizontal: 9,
  //   justifyContent: 'center',
  //   marginRight: 8,
  // },
  tagActive: {
    backgroundColor: colors.blue,
    borderRadius: 6,
    height: 20,
    paddingHorizontal: 9,
    justifyContent: 'center',
    marginRight: 8,
  },
  tagInactive: {
    backgroundColor: colors.grey,
    borderRadius: 6,
    height: 20,
    paddingHorizontal: 9,
    justifyContent: 'center',
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 2,
  },
  filterBtn: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
