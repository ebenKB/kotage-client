/* eslint-disable camelcase */
import Jszip from 'jszip';
import { saveAs } from 'file-saver';
import Axios from 'axios';
// import { createProxyMiddleware } from 'http-proxy-middleware';
import { getToken } from '.';

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
    return `${newSize.toFixed(2)}${postFix}`;
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
  // get the file name, remove anything after ?
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

// export const getFileType = (type) => {
//   console.log(type);
//   return type;
// };

export const prepareFileForDownload = (fileUrl) => (new Promise(
  // ((resolve, reject) => {
  //   console.log('This is the url we are using to fetch the blob', fileUrl);
  //   fetch(pdf, {
  //     method: 'GET',
  //     mode: 'cors',
  //     // headers: {
  //     //   'Content-Type': 'blob',
  //     // },
  //   })
  //     .then((response) => {
  //       console.log('This is the response', response);
  //       return response.blob();
  //     })
  //     .then((blob) => {
  //       console.log('This is the blob: ', blob);
  //       const fileData = {
  //         // staticUrl: createStaticFileUrl(blob.data),
  //         // remoteUrl: fileUrl,
  //         // fileName: getFileName(fileUrl),
  //         // fileSize: getFileSize(blob.data.size),
  //         // fileType: blob.data.type,
  //         // data: blob.data,
  //       };
  //       resolve(fileData);
  //     })
  //     .catch((err) => reject(err));
  // }),

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
          fileName: getFileName(fileUrl),
          fileSize: getFileSize(response.data.size),
          fileType: response.data.type,
          data: response.data,
        };
        resolve(fileData);
      })
      .catch((err) => reject(err));
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


// getFile('https://ebenkb.s3.us-east-2.amazonaws.com/kotage/e62b652c4b/rfx/1M-ebtiSy/MANAGEMENT+ACCOUNTING+(1).pdf')
// .then((response) => {
//   console.log('This is the response ', response);
//   setData(response.data);
//   const url = window.URL.createObjectURL(new Blob([response.data]));
//   setLink(url);
//   prepareFile(true);
//   getFileName('https://ebenkb.s3.us-east-2.amazonaws.com/kotage/e62b652c4b/rfx/1M-ebtiSy/MANAGEMENT+ACCOUNTING+(1).pdf');
// });

// export const getFileSignedUrl = (url, tenant_id, objectOwnerId) => async () => new
// Promise((resolve) => {
//   Axios.post(`${process.env.REACT_APP_apiHost}/${process.env.REACT_APP_apiNamespace}/v1/
//     ${tenant_id}/rfp/${objectOwnerId}/file_presigned`, {
//     filename: getFullFilePath(url),
//   })
//     .then((data) => {
//       console.log('sign data', data);
//       resolve(data);
//     });
// });

export const getFileSignedUrl = (url, tenant_id, objectOwnerId) => {
  const AxiosInstance = Axios.create({ headers: { Authorization: getToken() } });
  return new Promise((resolve) => {
    try {
      AxiosInstance.post(`${process.env.REACT_APP_apiHost}/${process.env.REACT_APP_apiNamespace}/v1/
      ${tenant_id}/rfp/${objectOwnerId}/file_presigned`, {
        filename: getFullFilePath(url),
      }).then((data) => resolve(data.data));
    } catch (error) {
      console.log(error);
    }
  });
};

export const getPresignUrlFromServer = async (key) => {
  const res = await Axios.get(`https://kotage-file-server.herokuapp.com/signUrl?key=${key}`);
  return res.data.preSignedUrl;
};
