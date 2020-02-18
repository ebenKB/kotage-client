/* eslint-disable import/prefer-default-export */
export const isValidEmail = (email) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));

export const titleize = (text) => {
  const data = text.split('');
  const newdata = data[0].toUpperCase();
  return `${newdata}${data.splice(1).join('')}`;
};
