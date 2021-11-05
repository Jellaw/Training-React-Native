import colors from '~/assets/colors';
import {shadowDefault} from '~/config/commonStyle';
import PlatformStyleSheet from '~/helpers/PlatformStyleSheet';

export default PlatformStyleSheet.create({
  container: {},
  searchBar: {
    width: '100%',
    padding: 10,
  },
  boxContent: {
    backgroundColor: colors.white,
    borderWidth: 0,
    padding: 10,
    ...shadowDefault,
  },
  rowTitle: {
    flexDirection: 'row',
  },
  titleHead: {
    fontWeight: '700',
    fontSize: 26,
  },
  boxHeader: {
    marginRight: 30,
    marginBottom: 20,
  },
  underlined: {
    borderRadius: 5,
    padding: 3,
    backgroundColor: colors.primary,
  },
  listItem: {
    marginBottom: 10,
  },
  scrollView: {
    marginBottom: 120,
  },
});
