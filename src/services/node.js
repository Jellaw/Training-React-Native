import {loggedInClient} from './utils';

const getNodeList = data => {
  return loggedInClient.get('/v1/nodes', data);
};

const getCheckNode = data => {
  return loggedInClient.get('/v1/nodes/check', data);
};
export default {
  getNodeList,
  getCheckNode,
};
