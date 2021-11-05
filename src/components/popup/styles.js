import PlatformStyleSheet from '~/helpers/PlatformStyleSheet';
import {screenWidth} from '~/config/commonStyle';

export default PlatformStyleSheet.create({
  overlayContainer: {
    borderRadius: 20,
    width: screenWidth - 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayBody: {},
});
