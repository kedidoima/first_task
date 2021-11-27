const firebaseAdmin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const serviceAccount = require('../uploadfile-7c93b-firebase-adminsdk-wqyhe-107edf664f.json');

const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket(`gs://uploadfile-7c93b.appspot.com`);

const uploadFile = async(path, filename) => {
  // Upload the File
  console.log('test');
  const storage = await storageRef.upload(path, {
      public: true,
      destination: `/uploads/${filename}`,
      metadata: {
          firebaseStorageDownloadTokens: uuidv4(),
      }
  });
  return storage[0].metadata.mediaLink;
}

module.exports = {
  uploadFile
}