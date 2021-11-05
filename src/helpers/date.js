import moment from 'moment';
import {localeDatePicker} from '~/config';

export function formatDateDefault(date) {
  return moment(date).format(localeDatePicker.dateFormat);
}

export function formatDateTimeDefault(date) {
  return moment(date).format(localeDatePicker.dateTimesFormat);
}

export function formatDate(date) {
  return moment(date).format(localeDatePicker.dateFormat);
}

export function formatDateTime(date) {
  return moment(date).format(localeDatePicker.dateTimeFormat);
}

export function formatTimeDefault(date) {
  return moment(date).format('LT');
}

export function formatMonth(date) {
  return moment(date).format('MM-YYYY');
}

export function formatDay(date) {
  return moment(date).format(localeDatePicker.lang.dayFormat);
}

export default moment;
