import { SafeUser } from "../types/ApiResponse/auth";

// Constants for storage keys
const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data'
};

/**
 * Gets the authentication token from storage
 */
export const getToken = async (): Promise<string | null> => {
  try {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error getting token from storage', error);
    return null;
  }
};

/**
 * Sets the authentication token in storage
 */
export const setToken = async (token: string): Promise<void> => {
  try {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  } catch (error) {
    console.error('Error setting token in storage', error);
  }
};

/**
 * Removes the authentication token from storage
 */
export const removeToken = async (): Promise<void> => {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error removing token from storage', error);
  }
};

/**
 * Gets the user data from storage
 */
export const getUserData = async (): Promise<SafeUser | null> => {
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data from storage', error);
    return null;
  }
};

/**
 * Sets the user data in storage
 */
export const setUserData = async (user: SafeUser): Promise<void> => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  } catch (error) {
    console.error('Error setting user data in storage', error);
  }
};

/**
 * Removes the user data from storage
 */
export const removeUserData = async (): Promise<void> => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  } catch (error) {
    console.error('Error removing user data from storage', error);
  }
};

/**
 * Type-safe storage helper for custom data
 */
export class TypedStorage<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  async get(): Promise<T | null> {
    try {
      const value = localStorage.getItem(this.key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error reading from storage: ${this.key}`, error);
      return null;
    }
  }

  async set(value: T): Promise<boolean> {
    try {
      localStorage.setItem(this.key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error saving to storage: ${this.key}`, error);
      return false;
    }
  }

  async remove(): Promise<boolean> {
    try {
      localStorage.removeItem(this.key);
      return true;
    } catch (error) {
      console.error(`Error removing from storage: ${this.key}`, error);
      return false;
    }
  }
}