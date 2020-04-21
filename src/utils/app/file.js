import Axios from 'axios';
import Jszip from 'jszip';
import { saveAs } from 'file-saver';

export const getFileSize = (bytes) => {
  console.log('These are the file bytes', bytes);
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
  console.log(data[data.length - 1]);
  return (data[data.length - 1]);
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

export const prepareFileForDownload = async (fileUrl) => (new Promise(
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
