import colors from '~/assets/colors';
import fonts from '~/assets/fonts';
import {screenWidth} from '~/config/commonStyle';
import PlatformStyleSheet from '~/helpers/PlatformStyleSheet';

export default PlatformStyleSheet.create({
  container: {flex: 1},
  titleHead: {
    ...fonts.type.bold(34),
  },
  textHead: {
    flexDirection: 'row',
  },
  btnLogOut: {
    padding: 0,
    width: 'auto',
    marginLeft: 5,
    textTransform: 'none',
  },
  textBtnLogOut: {
    textDecorationLine: 'none',
    color: colors.primary,
  },
  toolBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.lightgrey,
  },
  inputSearch: {
    width: screenWidth - 85,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    backgroundColor: colors.white,
    padding: 0,
  },
  inputSearchContent: {
    backgroundColor: colors.lightgrey,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 10,
  },
  iconMenu: {
    color: colors.lightblack,
  },
  pieChart: {
    marginVertical: 30,
    paddingLeft: 20,
  },
  boxContent: {
    flex: 1,
    backgroundColor: colors.white,
  },
  boxList: {
    marginBottom: 16,
  },
  smallBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
