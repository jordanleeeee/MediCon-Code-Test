import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';

class AsyncStorageManager {

  static getDeviceUUID() {
    return AsyncStorage.getItem('UUID').then((value) => {
      if (value) {
        return value
      } else {
        const newUUID = uuid.v4()
        AsyncStorageManager.save('UUID', newUUID)
        return newUUID
      }
    });
  }

  static get(key, defaultValue = undefined) {
    return AsyncStorage.getItem(key).then((value) => {
      return value
    });
  }

  static save(key, value) {
    return AsyncStorage.setItem(key, value);
  }

  static delete(key) {
    return AsyncStorage.removeItem(key);
  }
}

export default AsyncStorageManager;
