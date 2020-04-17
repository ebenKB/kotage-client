import Axios from 'axios';

export const getFileSize = (bytes) => {
  console.log('These are the file bytes', bytes);
  try {
    let newSize = null;
    let postFix = 'kb';
    if (bytes < 1000000) {
      newSize = (bytes / 1000);
    } else if (bytes < 125000000) {
      newSize = bytes / 1000000;
      postFix = 'mb';
    } else {
      newSize = (bytes / 125000000);
      postFix = 'gb';
    }
    return `${newSize.toFixed(2)}${postFix}`;
  } catch (error) {
    return bytes;
  }
};

export const getFileName = (url) => {
  const data = url.split('/');
  console.log(data[data.length - 1]);
  return (data[data.length - 1]);
};

export const downloadZip = (fileData) => {
  console.log('This is the file data', fileData);
};

export const downloadMultipleZip = (fileDataArray) => {
  console.log('This is the file data', fileDataArray);
};

export const createStaticFileUrl = (fileData) => window.URL.createObjectURL(new Blob([fileData]));

export const getFileType = (type) => {
  console.log(type);
  return type;
};

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
          fileName: getFileName(fileUrl),
          fileSize: getFileSize(response.data.size),
          fileType: response.data.type,
          data: response.data,
        };
        console.log('This is the file response', response);
        console.log('This is the file Data', fileData);
        resolve(fileData);
      })
      .catch((err) => reject(err));
  },
));


// getFile('https://ebenkb.s3.us-east-2.amazonaws.com/kotage/e62b652c4b/rfx/1M-ebtiSy/MANAGEMENT+ACCOUNTING+(1).pdf')
// .then((response) => {
//   console.log('This is the response ', response);
//   setData(response.data);
//   const url = window.URL.createObjectURL(new Blob([response.data]));
//   setLink(url);
//   prepareFile(true);
//   getFileName('https://ebenkb.s3.us-east-2.amazonaws.com/kotage/e62b652c4b/rfx/1M-ebtiSy/MANAGEMENT+ACCOUNTING+(1).pdf');
// });
