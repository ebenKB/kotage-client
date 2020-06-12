/* eslint-disable camelcase */
import Jszip from 'jszip';
import { saveAs } from 'file-saver';
import Axios from 'axios';
import { getToken } from '.';

/**
 * calculate the size of a file from raw bytes
 * @param {*} bytes the raw bytes of the file
 */
export const getFileSize = (bytes) => {
  try {
    let newSize = null;
    let postFix = 'KB';
    if (bytes < 1000000) {
      newSize = (bytes / 1000);
    } else if (bytes < 125000000) {
      newSize = bytes / 1000000;
      postFix = 'MB';
    } else {
      newSize = (bytes / 125000000);
      postFix = 'GB';
    }
    return `${newSize.toFixed(1)}${postFix}`;
  } catch (error) {
    return bytes;
  }
};

export const getFileName = (url) => {
  const data = url.split('/');
  // get the file name, remove anything after ? and remove the file extension
  return (data[data.length - 1].split('?')[0].split('.')[0]);
};

export const getFileNameAndExtension = (url) => {
  const data = url.split('/');
  // get the file name, remove anything after '?'
  return (data[data.length - 1].split('?')[0]);
};

export const getFullFilePath = (url) => {
  if (url) {
    const data = url.split('/');
    let path = '';
    for (let i = 3; i < data.length; i += 1) {
      if (i === 3) {
        path = data[i]; // don't append / to the beginning of the path
      } else {
        path = `${path}/${data[i]}`; // append / to the beginning of the path
      }
    }
    return path;
  }
  return url;
};

export const downloadZip = (fileData, filename, foldername) => {
  const zip = new Jszip();
  const zipFolder = zip.folder(foldername);
  zipFolder.file(filename, new Blob([fileData]), { base64: true });
  zip.generateAsync({ type: 'blob' })
    .then((data) => saveAs(data));
};

/**
 * download many files as a single zip
 * @param {*} fileDataArray the files to download
 * @param {*} foldername the name to be given to the folder
 */
export const downloadMultipleZip = (fileDataArray, foldername) => {
  const zip = new Jszip();
  const zipFolder = zip.folder(foldername);
  for (let i = 0; i < fileDataArray.length; i += 1) {
    zipFolder.file(fileDataArray[i].fileName, new Blob([fileDataArray[i].data]), { base64: true });
  }
  zip.generateAsync({ type: 'blob' })
    .then((data) => saveAs(data));
};

export const createStaticFileUrl = (fileData) => window.URL.createObjectURL(new Blob([fileData]));

/**
 * returns a file object with binary data of the file
 * @param {*} fileUrl the url of the file
 */
export const prepareFileForDownload = (fileUrl) => (new Promise(
  (resolve, reject) => {
    Axios({
      url: fileUrl,
      method: 'GET',
      responseType: 'blob',
    })
      .then((response) => {
        const fileData = {
          staticUrl: createStaticFileUrl(response.data),
          remoteUrl: fileUrl,
          fileName: getFileNameAndExtension(fileUrl),
          fileSize: getFileSize(response.data.size),
          fileType: response.data.type,
          data: response.data,
        };
        resolve(fileData);
      })
      .catch((err) => {
        reject(err);
      });
  },
));

export const prepareFileForDownloadSync = async (fileUrl) => {
  const response = await Axios({
    url: fileUrl,
    method: 'GET',
    responseType: 'blob',
  });
  const fileData = {
    staticUrl: createStaticFileUrl(response.data),
    remoteUrl: fileUrl,
    fileName: getFileName(fileUrl),
    fileSize: getFileSize(response.data.size),
    fileType: response.data.type,
    data: response.data,
  };
  return fileData;
};

/**
 * signs file url from AWS-S3
 * @param {*} url the s3 url of the file
 * @param {*} tenant_id the tenant who is logged in
 * @param {*} objectOwnerId the object that the file is attached to. e.g rfp ID
 */
export const getFileSignedUrl = (url, tenant_id, objectOwnerId) => {
  const AxiosInstance = Axios.create({ headers: { Authorization: getToken() } });
  return new Promise((resolve, reject) => {
    AxiosInstance
      .post(`${process.env.REACT_APP_apiHost}/${process
        .env.REACT_APP_apiNamespace}/v1/${tenant_id}/rfp/${objectOwnerId}/file_presigned`, {
        filename: getFullFilePath(url),
      }).then((data) => resolve(data.data))
      .catch((error) => reject(error));
  });
};

// signs file url from digital ocean spaces
export const getPresignUrlFromServer = async (key) => {
  const res = await Axios.get(`https://kotage-file-server.herokuapp.com/signUrl?key=${key}`);
  return res.data.preSignedUrl;
};

/**
 * returns the file extension
 * @param {*} filename the filename with extension
 */
export const getFileExtension = (filename) => {
  const data = filename.split('.');
  return data[data.length - 1];
};
