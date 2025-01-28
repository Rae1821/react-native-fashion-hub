import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageItem {
    key: string;
    value: any;
}

// Stores data locall on the device
// The key is the unique identifier and the value represents the data to be stored
export const setItem = async (key: StorageItem['key'], value: StorageItem['value']): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving item', error);
    }
};

interface GetItem {
    key: string;
}

// Returns the value associated with a given key from local storage.
export const getItem = async (key: GetItem['key']): Promise<any> => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error getting item:', error);
        return null;
    }
};

// This deletes the object with the supplied key from local storage
export const removeItem = async (key: GetItem['key']) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // This combines the value of an existing key with the value supplied as input.
  export const mergeItem = async (key: StorageItem['key'], value: StorageItem['value']) => {
    try {
      await AsyncStorage.mergeItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error merging item:', error);
    }
  };

  // Deletes all items from local storage
  export const clear = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  // Returns all keys kept in local storage
  export const getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  };

  export const getAllItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      return items.reduce((accumulator: { [key: string]: any }, [key, value]) => {
        if (value !== null) {
          accumulator[key] = JSON.parse(value);
        }
        return accumulator;
      }, {});
    } catch (error) {
      console.error('Error getting all items:', error);
      return {};
    }
  };