/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
export const isValidEmail = (email) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));

/**
 * This function takes a string and changes the first letter to Capital
 * @param {*} text The text to titleize
*/
export const titleize = (text) => {
  try {
    const data = text.split('');
    const newdata = data[0].toUpperCase();
    return `${newdata}${data.splice(1).join('')}`;
  } catch (err) {
    return text;
  }
};

export const pretifyMessage = (message) => {
  if (message) {
    if (message.toLowerCase() === 'network error') {
      return 'Please check your internet connection';
    } if (message.toLowerCase() === 'tenant not found') {
      return 'The tenant you are looking for could not be  found';
    }
    if (message.toUpperCase() === 'ECONNABORTED') {
      return 'Please try again shortly';
    }
    if (message === 409) {
      return 'This record alreday exists';
    }
  }
  return message;
};

export const getInitialNames = (value) => {
  let initials = '';
  const names = value.split(' ');
  initials = `${names[0].split('')[0]}${names[1].split('')[0]}`;
  return initials;
};
