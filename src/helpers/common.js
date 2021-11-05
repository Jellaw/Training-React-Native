import _ from 'lodash';
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
export const isHexadecimal = str => /[0-9A-F]{6}/g.test(str);
export const isDevEui = str =>
  _.isString(str) && isHexadecimal(str) && str.length === 16;
