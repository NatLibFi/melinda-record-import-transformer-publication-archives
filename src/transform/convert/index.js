import convertRecord from './common';

/* eslint-disable-next-line arrow-body-style */
export default options => fieldValueInterface => {
  // Support for new material types should be placed here
  return convertRecord(fieldValueInterface, options);
};
