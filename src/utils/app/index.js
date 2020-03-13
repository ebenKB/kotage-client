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

export const removeTimeFromDate = (date) => {
  console.log('This is the data', date);
  // if (date) {
  //   const newDate = date.split('T');
  //   return newDate(0);
  // } return date;
  return date;
};

/**
 * formate date to day-month-year
 * @param {*} dateObj the object to format
 */
export const formatDate = (dateObj) => {
  if (dateObj) {
    const year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    if (month < 10) {
      month = `0${month}`;
    }
    let day = dateObj.getDay();
    if (day < 10) {
      day = `0${day}`;
    }
    const newDate = `${day}-${month}-${year}`;
    return newDate;
  }
  return dateObj;
};

export const formatTime = (timeObj) => {
  if (timeObj) {
    let hrs = timeObj.getHours();
    if (hrs < 10) {
      hrs = `0${hrs}`;
    }
    let mins = timeObj.getMinutes();
    if (mins < 10) {
      mins = `0${mins}`;
    }
    return `${hrs}:${mins}`;
  }
  return timeObj;
};

/**
 * This function is used to merge rsvp date and time
 * @param {*} date the date to merge
 * @param {*} time the time to merge
 */
export const mergeDataAndTime = (date, time) => {
  console.log('This is the date and time', date, time);
};
