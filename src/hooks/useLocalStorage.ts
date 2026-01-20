import { useState, useEffect } from 'react';

// Custom event for localStorage updates
const STORAGE_EVENT = 'localStorageUpdate';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Get from localStorage or use initial value
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function
  const setValue = (value: T) => {
    try {
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(value));
      
      // Save state
      setStoredValue(value);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { 
        detail: { key, value } 
      }));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    // Listen for changes from other components
    const handleStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.key === key) {
        setStoredValue(readValue());
      }
    };

    // Listen for changes from other tabs/windows
    const handleNativeStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        setStoredValue(readValue());
      }
    };

    window.addEventListener(STORAGE_EVENT, handleStorageChange);
    window.addEventListener('storage', handleNativeStorageChange);

    return () => {
      window.removeEventListener(STORAGE_EVENT, handleStorageChange);
      window.removeEventListener('storage', handleNativeStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

// Helper to trigger updates from anywhere
export function triggerStorageUpdate(key: string, value: any) {
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { 
    detail: { key, value } 
  }));
}
