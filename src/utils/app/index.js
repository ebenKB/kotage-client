/* eslint-disable no-async-promise-executor */
/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-loop-func */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import Axios from 'axios';
import shortid from 'shortid';
import { RFP_FOLDER_NAME } from './definitions';

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
 * get date from date and time object
 * @param {*} date the date and time object
 */
export const getDateOnly = (date) => {
  if (date !== null && date !== undefined) {
    return date.split('T')[0];
  }
};

/**
 * get time from date and time object
 * @param {*} date the date and time object
 */
export const getTimeOnly = (date) => {
  if (date !== null && date !== undefined) {
    return date.split('T')[1];
  }
};

/**
 *
 * formate date to year-month-day e.g yyyy-mm-dd
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
    // return `${month}-${day}-${year}`;
    return `${year}-${month}-${day}`;
  }
  return dateObj;
};

/**
 * change the time to a format that is readable by the user
 * @param {*} time the time to convert
 */
export const convertTimeToDisplay = (time) => {
  if (time !== null && time !== undefined) {
    const newTime = time.split(':');
    let hrs = newTime[0];
    const mins = newTime[1];
    const secs = newTime[2];
    let format = 'am';
    if (hrs >= 12) {
      format = 'pm';
      if (hrs > 12) {
        hrs -= 12;
      }
    }
    return `${hrs}:${mins}:${secs} ${format}`;
  }
  return time;
};
/**
 * all time records will be formeatted to hh:mm using the 24 hour format
 * The condition that checks if hrs < 10 or if mins < 10
 * is only there to make sure that the time is always in 2 digits.
 * It is not checking the actual hrs or minutes per se.
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
      mins = `0${mins}`; // append 0 to always return 2 digits
    }
    return `${hrs}:${mins}`;
  }
  return timeObj;
};

export const getNameFromFileName = (fileName) => {
  const newName = fileName.split('.')[0].toUpperCase();
  return newName.replace(new RegExp('[-_]', 'g'), ' ');
};

/**
 * Use this function to upload a single file to s3
 * @param {*} file the file to upload
 * @param {*} tenant_uid the uid of the current tenant
 * @param {*} item_id a unique id of the item that the file belongs to
 * @param {*} folderName the name of the folder where the files should be saved
 * example folder names include : rfp = request for proposal, rfi = request for information,
 * rfq = request for quote, messages,
 */

const uploadToS3 = (file, tenant_uid, item_id, folderName) => new Promise((resolve, reject) => {
  if (folderName !== null && folderName !== '' && folderName !== undefined) {
    import('../../react-s3/ReactS3').then((reactS3) => {
      const config = {
        bucketName: process.env.REACT_APP_bucketName,
        dirName: `kotage/${tenant_uid}/${folderName}/${item_id}`,
        region: process.env.REACT_APP_awsRegion,
        accessKeyId: process.env.REACT_APP_awsAccessKeyId,
        secretAccessKey: process.env.REACT_APP_awsSecretAccessKey,
        newFileName: file.data.name.replace(/\s/g, '_'),
        meta: {
          owner: tenant_uid,
        },
      };
      try {
        reactS3.uploadFile(file.data, config)
          .then((data) => resolve(data));
      } catch (error) {
        reject(error);
      }
    });
  }
});

/**
 * uploads files the remote for Digital ocean space
 * @param {*} files the files to upload to the server
 */
// eslint-disable-next-line no-unused-vars
const uploadToFileServer = async (file, tenant_uid, objectID) => {
  if (file && tenant_uid && objectID) {
    const key = `kotage/${tenant_uid}/${RFP_FOLDER_NAME}/${objectID}/${file.data.name}`;
    const formData = new FormData();

    formData.append('key', key);
    formData.append('file', file.data);

    const res = await Axios.post('https://kotage-file-server.herokuapp.com/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res.status === 200) {
      return { location: `${process.env.REACT_APP_DO_space_base_url}/${key}` };
    }
  }
};

/**
 * use this function to upload multiple files to s3
 * @param {*} files the file to be uploaded to the server
 * returns a reference to the file on the server
 */
export const uploadFiles = (files, tenant_uid, directory) => new
Promise(async (resolve, reject) => {
  try {
    let response = [];
    let promises = [];
    const object_id = shortid.generate();
    // const folderName = process.env.REACT_APP_rfpFolderName;
    for (const file of files) {
      // const data = await uploadToFileServer(file, tenant_uid, rfp_id);
      const promise = uploadToS3(file, tenant_uid, object_id, directory);
      promises = [...promises, promise];
      // response = [...response, { title: file.title, url: data.location }];
    }
    const data = await Promise.all(promises);
    response = data.map((d, idx) => ({ title: files[idx].title, url: d.location }));
    resolve(response);
  } catch (error) {
    reject(error);
  }
});

/**
 * delete file from s3
 * @param {*} url the url of the file to delete
 */
export const deleteFileFroms3 = (url) => {
  import('react-s3').then((reacts3) => {
    const config = {
      bucketName: process.env.REACT_APP_bucketName,
      region: 'us-east-2',
      accessKeyId: process.env.REACT_APP_awsAccessKeyId,
      secretAccessKey: process.env.REACT_APP_awsSecretAccessKey,
    };
    reacts3.deleteFile(url, config)
      .then((data) => {
        console.log('The file file been deleted', data);
      });
  });
};

/**
 * get the token of the currently logged in user
 */
export const getToken = () => {
  const ktToken = localStorage.getItem('kotage-auth');
  if (ktToken != null) {
    const { token } = JSON.parse(ktToken);
    return token;
  }
  return undefined;
};

/**
 *
 * @param {*} content the content to trim
 * @param {*} size defaults to 100. the size of the new string
 */
export const trimContent = (content, size = 100) => {
  if (content && content !== undefined) {
    if (content.length < size) {
      return content;
    }
    return `${content.substring(0, size)}...`;
  }
  return content;
};

/**
 * find how many more records a user can view during pagination
 * @param {*} total the overall total number of items returned by the api
 * @param {*} itemSize the number of items on each page
 * @param {*} page the current page number
 */
export const getPageRemainder = (total, totalFound, perPage) => {
  let rem = 0;
  rem = total - totalFound;
  if (rem > perPage) {
    return perPage;
  }
  return rem;
};

// export const getPageRemainder = (total, itemSize, page) => {
//   let rem = 0;
//   if (total > itemSize) {
//     // get how many items are left to view
//     const diff = (total - (page * itemSize));
//     if (diff > 0) {
//       if (diff > itemSize) {
//         rem = diff - itemSize;
//       } else {
//         rem = diff;
//       }
//     }
//   }
//   return rem;
// };
