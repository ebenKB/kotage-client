/* eslint-disable no-async-promise-executor */
/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-loop-func */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import shortid from 'shortid';

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

/**
 * This function is used to merge rsvp date and time
 * @param {*} date the date to merge
 * @param {*} time the time to merge
 */
export const mergeDateAndTime = (date, time) => (`${date}T${time}`);

/**
 * formate date to month-day-year e.g mm-dd-yyyy
 * @param {*} dateObj the date to format
 */
export const formatDate = (dateObj) => {
  if (dateObj) {
    const year = dateObj.getFullYear();
    // add 1 to the month because Javascript starts counting months from 0
    let month = dateObj.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = dateObj.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    return `${month}-${day}-${year}`;
  }
  return dateObj;
};

/**
 * all time records will be formeatted to hh:mm using the 24 hour format
 * @param {*} timeObj the time to format
 */
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

export const getNameFromFileName = (fileName) => {
  const newName = fileName.split('.')[0].toUpperCase();
  return newName.replace(new RegExp('[-_]', 'g'), ' ');
};

const uploadToS3 = (file, tenant_uid, rfp_id) => new Promise((resolve, reject) => {
  import('react-s3').then((reactS3) => {
    const config = {
      bucketName: 'ebenkb',
      dirName: `kotage/${tenant_uid}/rfx/${rfp_id}`,
      region: 'us-east-2',
      accessKeyId: process.env.REACT_APP_awsAccessKeyId,
      secretAccessKey: process.env.REACT_APP_awsSecretAccessKey,
      meta: {
        owner: tenant_uid,
      },
    };
    try {
      reactS3.uploadFile(file, config)
        .then((data) => resolve(data));
    } catch (error) {
      reject(error);
    }
  });
});

/**
 *
 * @param {*} file the file to be uploaded to the server
 * returns a reference to the file on the server
 */
export const uploadFile = (files, tenant_uid) => new Promise(async (resolve, reject) => {
  try {
    let response = [];
    const rfp_id = shortid.generate();
    for (const file of files) {
      const data = await uploadToS3(file, tenant_uid, rfp_id);
      response = [...response, data];
    }
    resolve(response);
  } catch (error) {
    reject(error);
  }
});

export const getToken = () => {
  const ktToken = localStorage.getItem('kotage-auth');
  if (ktToken != null) {
    const { token } = JSON.parse(ktToken);
    return token;
  }
  return undefined;
};
