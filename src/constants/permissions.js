export default {
  // roles api
  // Me
  ME_GET: '/me',
  ME_SIGN_OUT: '/me/sign-out',
  ME_CHANGE_PASSWORD: '/me/change-password',
  ME_CHANGE_EMAIL: 'me/change-email',

  // Users
  USER_GET_LIST: '/user',
  USER_GET: '/user/get-details',
  USER_CREATE: '/user/create',
  USER_UPDATE: '/user/update',

  // Users group
  USER_GROUP_GET_LIST: '/user-group',
  USER_GROUP_GET: '/user-group/get-details',
  USER_GROUP_CREATE: '/user-group/create',
  USER_GROUP_UPDATE: '/user-group/update',
  USER_GROUP_DELETE: '/user-group/delete',

  // TTN Integration
  TTN_APPLICATION_GET_LIST: '/ttn-application',
  TTN_APPLICATION_GET: '/ttn-application/get-details',

  // TTN Integration - device
  TTN_APPLICATION_DEVICE_GET_LIST: '/ttn-application-device',
  TTN_APPLICATION_DEVICE_GET: '/ttn-application-device/get-details',
  TTN_APPLICATION_DEVICE_CREATE: '/ttn-application-device/create',
  TTN_APPLICATION_DEVICE_UPDATE: '/ttn-application-device/update',
  TTN_APPLICATION_DEVICE_DELETE: '/ttn-application-device/delete',

  // Projects
  PROJECT_GET_LIST: '/project',
  PROJECT_GET: '/project/get-details',
  PROJECT_CREATE: '/project/create',
  PROJECT_UPDATE: '/project/update',
  PROJECT_DELETE: '/project/delete',

  // Contacts
  CONTACT_GET_LIST: '/contact',
  CONTACT_GET: '/contact/get-details',
  CONTACT_CREATE: '/contact/create',
  CONTACT_UPDATE: '/contact/update',
  CONTACT_DELETE: '/contact/delete',
  CONTACT_BLOCK: '/contact/block',
  CONTACT_UNBLOCK: '/contact/un-block',

  // Project Nodes
  PROJECT_NODE_GET_LIST: '/project-node',
  PROJECT_NODE_GET: '/project-node/get-details',
  PROJECT_NODE_CREATE: '/project-node/create',
  PROJECT_NODE_UPDATE: '/project-node/update',
  PROJECT_NODE_DELETE: '/project-node/delete',
  PROJECT_NODE_CHECK: '/project-node/check',
  PROJECT_NODE_BULK: '/project-node/bulk',
  PROJECT_NODE_PAUSE: '/project-node/action-pause',
  PROJECT_NODE_RESUME: '/project-node/action-resume',
  PROJECT_NODE_CHECKED: '/project-node/action-checked',
  PLANNED_OUTSTAGE_RESUME: '/planned-outstage/action-resume',

  // Nodes
  NODE_GET_LIST: '/node',
  NODE_GET: '/node/get-details',
  NODE_CREATE: '/node/create',
  NODE_UPDATE: '/node/update',
  NODE_DELETE: '/node/delete',

  // Companies
  COMPANY_GET_LIST: '/company',
  COMPANY_GET: '/company/get-details',
  COMPANY_CREATE: '/company/create',
  COMPANY_UPDATE: '/company/update',
  COMPANY_DELETE: '/company/delete',

  // Histories
  HISTORY_GET_LIST: '/history',

  // Planned outstages
  PLANNED_OUTSTAGE_GET_LIST: '/planned-outstage',
  PLANNED_OUTSTAGE_GET: '/planned-outstage/get-details',
  PLANNED_OUTSTAGE_CREATE: '/planned-outstage/create',
  PLANNED_OUTSTAGE_UPDATE: '/planned-outstage/update',
  PLANNED_OUTSTAGE_DELETE: '/planned-outstage/delete',

  // Roles web
  // PetNroject details
  PROJECT_DETAILS__VIEW_NAME: '/project-details/view-name',
  PROJECT_DETAILS__NODE_CURRENT_STATE:
    '/project-details/view-node-current-state',
  PROJECT_DETAILS__VIEW_ALERT_STATUS: '/project-details/view-alert-status',
  PROJECT_DETAILS__NODE_FILTER__STATUS: '/project-details/node-filter/status',
  PROJECT_DETAILS__NODE_FILTER__SEARCH: '/project-details/node-filter/search',
  PROJECT_DETAILS__VIEW_HISTORY_TAB: '/project-details/view-history-tab',
  PROJECT_DETAILS__VIEW_CONTACT_TAB: '/project-details/view-contact-tab',
  PROJECT_DETAILS__VIEW_PLANNED_OUTAGE: '/project-details/view-planned-outage',
  PROJECT_DETAILS__CREATE_PLANNED_OUTAGE:
    '/project-details/create-planned-outage',
  PROJECT_DETAILS__UPDATE_PLANNED_OUTAGE:
    '/project-details/update-planned-outage',
  PROJECT_DETAILS__RESUME_PLANNED_OUTAGE:
    '/project-details/resume-planned-outage',
  PROJECT_DETAILS__VIEW_PROJECT_BUTTON: '/project-details/view-project-button',
  PROJECT_DETAILS__HISTORY_FILTER_SCAFFOLDING:
    '/project-details/history/filter/scaffolding',
  PROJECT_DETAILS__HISTORY_FILTER_SEARCH:
    '/project-details/history/filter/search',
  PROJECT_DETAILS__HISTORY_FILTER_DATE: '/project-details/history/filter/date',
  PROJECT_DETAILS__HISTORY_FILTER_STATUS:
    '/project-details/history/filter/status',
  PROJECT_DETAILS__ACTION_SCHEDULE_OUTAGE:
    '/project-details/action/schedule-outage',
  PROJECT_DETAILS__ACTION_PAUSE_TRACKING:
    '/project-details/action/pause-tracking',
  PROJECT_DETAILS__ACTION_CHECKED_RESUME_NOW:
    '/project-details/action/check-resume-now',
  PROJECT_DETAILS__ACTION_RESUME_TRACKING_UNPAUSE:
    '/project-details/action/resume-tracking-unpause',

  // Roles mobile
};
