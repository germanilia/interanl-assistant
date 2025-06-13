// Storage utilities for managing saved credentials and user preferences

interface SavedCredentials {
  email: string;
  password: string;
}

const STORAGE_KEYS = {
  SAVED_CREDENTIALS: 'saved_credentials',
  REMEMBER_ME: 'remember_me',
} as const;

/**
 * Simple base64 encoding for basic obfuscation
 * Note: This is NOT secure encryption, just basic obfuscation
 */
function encode(value: string): string {
  try {
    return btoa(value);
  } catch {
    return value;
  }
}

/**
 * Simple base64 decoding
 */
function decode(value: string): string {
  try {
    return atob(value);
  } catch {
    return value;
  }
}

/**
 * Save user credentials to localStorage with basic obfuscation
 */
export function saveCredentials(email: string, password: string): void {
  try {
    const credentials: SavedCredentials = {
      email: encode(email),
      password: encode(password),
    };
    localStorage.setItem(STORAGE_KEYS.SAVED_CREDENTIALS, JSON.stringify(credentials));
    localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
  } catch (error) {
    console.error('Failed to save credentials:', error);
  }
}

/**
 * Load saved credentials from localStorage
 */
export function loadSavedCredentials(): SavedCredentials | null {
  try {
    const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
    if (rememberMe !== 'true') {
      return null;
    }

    const savedData = localStorage.getItem(STORAGE_KEYS.SAVED_CREDENTIALS);
    if (!savedData) {
      return null;
    }

    const credentials = JSON.parse(savedData) as SavedCredentials;
    return {
      email: decode(credentials.email),
      password: decode(credentials.password),
    };
  } catch (error) {
    console.error('Failed to load saved credentials:', error);
    return null;
  }
}

/**
 * Clear saved credentials from localStorage
 */
export function clearSavedCredentials(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.SAVED_CREDENTIALS);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
  } catch (error) {
    console.error('Failed to clear saved credentials:', error);
  }
}

/**
 * Check if remember me is enabled
 */
export function isRememberMeEnabled(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
  } catch {
    return false;
  }
}
