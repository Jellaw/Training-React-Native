import colors from '~/assets/colors';
import fonts from '~/assets/fonts';
import {screenWidth} from '~/config/commonStyle';
import PlatformStyleSheet from '~/helpers/PlatformStyleSheet';

export default PlatformStyleSheet.create({
  smallBtn: {
    width: 40,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      x: 0,
      y: 0,
    },
    shadowRadius: 1.5,
    elevation: 1.5,
    backgroundColor: 'white',
    paddingTop: 0,
    paddingHorizontal: 36,
  },
  button: {
    paddingHorizontal: 25,
    justifyContent: 'center',
    height: 44,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.purple,
  },
  textInput: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9EAF0',
    marginRight: 10,
    ...fonts.type.base(14),
    paddingHorizontal: 16,
  },
  inputLabel: {
    ...fonts.type.bold(12),
    marginBottom: 5,
    marginTop: 24,
  },
  submitButton: {
    height: 44,
    backgroundColor: colors.purple,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 56,
  },
  cameraScan: {
    width: screenWidth - 100,
    height: '20%',
    margin: 25,
  },
});
