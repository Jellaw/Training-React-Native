import * as enzyme from 'enzyme';

require('jasmine-expect-jsx');
const sinon = require('sinon');
const moment = require('moment-timezone');
const Adapter = require('enzyme-adapter-react-16');

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: () => {},
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
}));

// jest.mock('react-native-i18n', () => ({
//   translations: {},
//   t: () => null,
// }));

jest.mock('react-redux', () => ({
  connect: jest.fn(() => component => `Connected${component.name}`),
}));

// Global deps
global.values = obj => Object.keys(obj).map(key => obj[key]);
global.sinon = sinon;
global.URL = {
  value: {
    createObjectURL: function (input) {
      return input + '-object-url';
    },
  },
};

enzyme.configure({adapter: new Adapter()});

// Correct timezone
moment.tz.setDefault('UTC');

afterEach(function () {
  sinon.restore();
});
