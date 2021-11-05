import colors from '~/assets/colors';
import PlatformStyleSheet from '~/helpers/PlatformStyleSheet';

export default PlatformStyleSheet.create({
  container: {
    backgroundColor: colors.lightgrey,
    borderRadius: 30,
    shadowOffset: {
      x: 0,
      y: 4,
    },
    shadowRadius: 5,
    shadowOpacity: 0.08,
    elevation: 5,
    padding: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rowSpace: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textLeft: {
    width: '30%',
  },
  textCenter: {
    fontWeight: '700',
  },
  textAction: {
    color: colors.white,
    fontWeight: '700',
  },
  btnAction: {
    padding: 5,
    width: 90,
  },
  rowBtnCircle: {
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnCircle: {
    width: 35,
    height: 35,
    padding: 0,
    borderRadius: 20,
  },
  tagActive: {
    backgroundColor: colors.blue,
    borderRadius: 6,
    height: 17,
    paddingHorizontal: 9,
    justifyContent: 'center',
    marginRight: 8,
  },
  tagInactive: {
    backgroundColor: colors.grey,
    borderRadius: 6,
    height: 17,
    paddingHorizontal: 9,
    justifyContent: 'center',
    marginRight: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 2,
  },
});
