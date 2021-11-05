import {companySlice} from './reducer';
import companyAPI from '~/services/company';

export const {companyList, companyDetail} = companySlice.actions;

export const getCompanyList = query => async dispatch => {
  await companyAPI
    .getCompanyList(query)
    .then(data => dispatch(exports.companyList(data.data)))
    .catch();
};

export const getCompanyDetail = id => async dispatch => {
  await companyAPI
    .getCompanyDetail(id)
    .then(data => dispatch(exports.companyDetail(data.data)))
    .catch();
};
