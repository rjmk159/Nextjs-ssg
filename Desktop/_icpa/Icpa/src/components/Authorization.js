import AsyncStorage from '@react-native-community/async-storage';

export const checkAuthorization = (key) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getAllKeys().then((keys) => {
      console.log(keys)
        return AsyncStorage.multiGet(keys)
          .then((result) => {
            resolve(result);
            console.log(result);
          })
          .catch((e) => {
            reject(e);
          });
    });
  });
};
