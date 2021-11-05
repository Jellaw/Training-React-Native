import {loggedInClient} from './utils';

const getCompanyList = data => {
  return loggedInClient.get('/v1/companies', data);
};

const getCompanyDetail = (id, data) => {
  return loggedInClient.get('/v1/companies/' + id, data);
};

const postCompanyCreate = data => {
  return loggedInClient.post('/v1/companies', data);
};

const postCompanyUpdate = (id, data) => {
  return loggedInClient.put('/v1/companies/' + id, data);
};

const postCompanyDelete = (id, data) => {
  return loggedInClient.delete('/v1/companies/' + id, data);
};

export default {
  getCompanyList,
  getCompanyDetail,
  postCompanyCreate,
  postCompanyUpdate,
  postCompanyDelete,
};
