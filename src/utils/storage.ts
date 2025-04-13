import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeUser } from "../types/ApiResponse/auth";

// Constants for storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER: "user_data",
};

/**
 * Type-safe wrapper for AsyncStorage
 */
export class TypedStorage<T> {
  private key: string;
  constructor(key: string) {
    this.key = key;
  }

  async get(): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(this.key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error reading from storage: ${this.key}`, error);
      return null;
    }
  }

  async set(value: T): Promise<boolean> {
    try {
      await AsyncStorage.setItem(this.key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error saving to storage: ${this.key}`, error);
      return false;
    }
  }

  async remove(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(this.key);
      return true;
    } catch (error) {
      console.error(`Error removing from storage: ${this.key}`, error);
      return false;
    }
  }
}

// Helper functions for common storage operations
export const getToken = async (): Promise<string | null> => {
  const tokenStorage = new TypedStorage<string>(STORAGE_KEYS.AUTH_TOKEN);
  return tokenStorage.get();
};

export const setToken = async (token: string): Promise<void> => {
  const tokenStorage = new TypedStorage<string>(STORAGE_KEYS.AUTH_TOKEN);
};

export const removeToken = async (): Promise<void> => {
  const tokenStorage = new TypedStorage<string>(STORAGE_KEYS.AUTH_TOKEN);
};

// User storage helpers
export const getUserData = async (): Promise<SafeUser | null> => {
  const userStorage = new TypedStorage<SafeUser>(STORAGE_KEYS.USER);
  return userStorage.get();
};

export const setUserData = async (user: SafeUser): Promise<void> => {
  const userStorage = new TypedStorage<SafeUser>(STORAGE_KEYS.USER);
};

export const removeUserData = async (): Promise<void> => {
  const userStorage = new TypedStorage<SafeUser>(STORAGE_KEYS.USER);
};

export const clearAllStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing storage", error);
  }
};