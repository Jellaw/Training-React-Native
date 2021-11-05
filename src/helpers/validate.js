import {isArray, isEmpty as isEmptyJs} from 'validate.js';

export function isEmpty(e) {
  if (isArray(e) && e.length === 0) {
    return true;
  }

  return isEmptyJs(e);
}
