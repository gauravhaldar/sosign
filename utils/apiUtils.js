// API utility functions for handling rate limits and retries

export const fetchWithRetry = async (url, options = {}, maxRetries = 3) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) {
        if (attempt === maxRetries - 1) {
          // Last attempt failed, return empty data instead of throwing
          console.warn(`Rate limit exceeded for ${url} after ${maxRetries} attempts`);
          return { success: false, data: null, rateLimited: true };
        }
        
        // Wait before retrying (exponential backoff)
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        console.warn(`Rate limited. Retrying ${url} in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return { success: true, data, rateLimited: false };
      
    } catch (error) {
      if (attempt === maxRetries - 1) {
        console.error(`Failed to fetch ${url} after ${maxRetries} attempts:`, error);
        return { success: false, data: null, error: error.message };
      }
      
      // Wait before retrying
      const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// Debounce utility function
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Rate limit aware fetch for components
export const safeFetch = async (url, options = {}) => {
  const result = await fetchWithRetry(url, options);
  
  if (result.rateLimited) {
    // Return empty data structure to prevent crashes
    return { petitions: [], successfulPetitions: [], success: false };
  }
  
  return result.data || { petitions: [], successfulPetitions: [], success: false };
};
