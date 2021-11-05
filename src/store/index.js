import {configureStore} from '@reduxjs/toolkit';
import authReducer from '~/store/auth/reducer';
import meReducer from '~/store/me/reducer';
import errorReducer from '~/store/error/reducer';
import projectsReducer from '~/store/project/reducer';
import companyReducer from '~/store/company/reducer';
import ttnApplicationReducer from '~/store/ttn-application/reducer';
import nodeReducer from '~/store/node/reducer';

export default configureStore({
  reducer: {
    auth: authReducer,
    me: meReducer,
    error: errorReducer,
    project: projectsReducer,
    company: companyReducer,
    ttnApplication: ttnApplicationReducer,
    node: nodeReducer,
  },
});
