import colors from '~/assets/colors';
import PlatformStyleSheet from '~/helpers/PlatformStyleSheet';

export default PlatformStyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white,
    borderWidth: 0.2,
    borderColor: colors.lightblack,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
  },
  boxContent: {
    width: '50%',
  },
  rowContent: {
    marginBottom: 5,
  },
  title: {
    width: '40%',
  },
  content: {
    width: '60%',
    fontWeight: '700',
  },
  btn: {
    alignItems: 'flex-end',
  },
  btnIcon: {
    padding: 5,
    width: 140,
  },
});
