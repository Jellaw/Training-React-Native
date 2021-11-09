import _ from 'lodash';
export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export const shortTreeArray = (
  treeArr = [],
  childrenType,
  rootId = undefined,
) => {
  const arr = [];
  for (let i = 0; i < treeArr.length; i++) {
    const childOfI = treeArr[i].parentId == rootId && treeArr[i];
    if (childOfI) {
      const childObj = {
        ...childOfI,
        [childrenType[childOfI.type]]: shortTreeArray(
          treeArr,
          childrenType,
          childOfI.id,
        ),
      };
      arr.push(childObj);
    }
  }
  return arr;
};

export const getNodeInDeviceLocationTree = (treeArr, id, callback) => {
  for (let i = 0; i < treeArr.length; i++) {
    if (treeArr[i].id === id) {
      callback(treeArr[i]);
      return true;
    }
    if (treeArr[i].children) {
      if (getNodeInDeviceLocationTree(treeArr[i].children, id, callback)) {
        return true;
      }
    }
  }
  return false;
};
export const isHexadecimal = str => /^[0-9A-Fa-f]{16}\b/.test(str);
export const isDevEui = str =>
  _.isString(str) && isHexadecimal(str) && str.length === 16;
