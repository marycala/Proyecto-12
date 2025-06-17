import { useState, useEffect } from 'react'

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading localStorage key:', key, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      const currentValue = JSON.stringify(storedValue)
      if (localStorage.getItem(key) !== currentValue) {
        localStorage.setItem(key, currentValue)
      }
    } catch (error) {
      console.error('Error saving to localStorage:', key, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
