import moment from 'moment';

const isDate = (value: string): boolean => {
  if (!value) {
    return false;
  }

  const date = moment(value);
  if (date.isValid()) {
    return true;
  } else {
    return false;
  }
};

export default isDate;
