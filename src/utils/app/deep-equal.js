/* eslint-disable no-restricted-syntax */
const isObject = (object) => object !== null && typeof object === 'object';

const deepEqual = (obj1, obj2) => {
  // check if they are objects
  if (!isObject(obj1) || !isObject(obj2)) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    const areObjects = isObject(val1) && isObject(val2);

    if ((areObjects && !deepEqual(val1, val2)) || (areObjects && val1 !== val2)) {
      return false;
    }
  }
  return true;
};

export default deepEqual;
