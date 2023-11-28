export const base64toBlob = (base64Data: any, contentType: any) => {
  contentType = contentType || "";
  let sliceSize = 1024;
  let byteCharacters = window.atob(base64Data);
  let bytesLength = byteCharacters.length;
  let slicesCount = Math.ceil(bytesLength / sliceSize);
  let byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    let begin = sliceIndex * sliceSize;
    let end = Math.min(begin + sliceSize, bytesLength);

    let bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }

  return new Blob(byteArrays, { type: contentType });
};

export const convertFilesToBlobs = async (files = []) => {
  let arrayBlobs = [];
  for (let i = 0; i < files.length; i++) {
    let initialBlob = await new Blob([files[i]], {
      type: "application/pdf",
    }).arrayBuffer();
    arrayBlobs.push(initialBlob);
  }
  return arrayBlobs;
};
