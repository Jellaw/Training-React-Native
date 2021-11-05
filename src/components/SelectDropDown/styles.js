import PlatformStyleSheet from '~/helpers/PlatformStyleSheet';
import {screenWidth} from '~/config/commonStyle';

export default PlatformStyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  seclect: {
    flexDirection: 'row',
  },
  buttonInput: {
    justifyContent: 'flex-start',
    width: screenWidth - 40,
  },
  image: {
    marginTop: 10,
    width: 15,
    height: 15,
  },
  icon: {
    marginTop: 10,
  },
  input: {
    color: 'red',
    fontSize: 15,
  },
  optionsDrepDown: {
    backgroundColor: '#eee',
    zIndex: 1,
    // position: 'absolute',
    // top: 40,
  },
  dropDown: {
    alignSelf: 'flex-end',
  },
  optionsTitleDrepDown: {
    color: '#666',
    fontSize: 16,
  },
  optionsButtonDrepDown: {
    width: screenWidth,
    justifyContent: 'flex-start',
  },
  mainDropDown: {
    // backgroundColor: '#eee',
  },
});
