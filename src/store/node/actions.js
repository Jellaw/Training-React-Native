import {nodeSlice} from './reducer';
import nodeAPI from '~/services/node';

export const {nodeList} = nodeSlice.actions;

export const getNodeList = query => async dispatch => {
  await nodeAPI
    .getNodeList(query)
    .then(data => dispatch(exports.nodeList(data.data)))
    .catch();
};

export const getCheckNode = query => {
  return nodeAPI
    .getCheckNode(query)
    .then(data => data.data)
    .catch(() => false);
};
