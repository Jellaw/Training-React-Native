import colors from '~/assets/colors';
import {NODE_STATUS} from '~/constants/masterData';

const getDeviceColor = status => {
  switch (status) {
    case NODE_STATUS.ALERT:
      return colors.red;
    case NODE_STATUS.ACTIVE:
      return colors.green;
    case NODE_STATUS.CHECK:
      return colors.yellow;
    case NODE_STATUS.PAUSE:
      return colors.darkgrey;
    case 'UNRECOG':
      return colors.purple;
    default:
      return colors.purple;
  }
};

const getDeviceStateIcon = status => {
  switch (status) {
    case NODE_STATUS.ALERT:
      return 'exclamation-circle';
    case NODE_STATUS.ACTIVE:
      return 'router';
    case NODE_STATUS.CHECK:
      return 'router';
    case NODE_STATUS.PAUSE:
      return 'pause-circle';
    case 'UNRECOG':
      return 'question-circle';
    default:
      return 'question-circle';
  }
};

export {getDeviceColor, getDeviceStateIcon};
