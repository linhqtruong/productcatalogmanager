import axios from 'axios';
import config from '../config/config';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging and debugging
apiClient.interceptors.request.use(
  (config) => {
    if (config.ENABLE_DEBUG_LOGGING) {
      console.log('API Request:', {
        method: config.method,
        url: config.url,
        params: config.params,
        data: config.data,
      });
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    if (config.ENABLE_DEBUG_LOGGING) {
      console.log('API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          throw new Error(`Bad Request: ${data.message || 'Invalid request data'}`);
        case 401:
          throw new Error('Unauthorized: Please log in again');
        case 403:
          throw new Error('Forbidden: You do not have permission to access this resource');
        case 404:
          throw new Error(`Not Found: ${data.message || 'The requested resource was not found'}`);
        case 422:
          throw new Error(`Validation Error: ${data.message || 'Data validation failed'}`);
        case 500:
          throw new Error('Server Error: Please try again later');
        default:
          throw new Error(`HTTP Error ${status}: ${data.message || 'An unexpected error occurred'}`);
      }
    } else if (error.request) {
      // Network error
      throw new Error('Network Error: Please check your internet connection');
    } else {
      // Other error
      throw new Error(`Request Error: ${error.message}`);
    }
  }
);

// API service methods
export const apiService = {
  // Products
  getProducts: async (params = {}) => {
    const response = await apiClient.get('/products', { params });
    return response.data;
  },

  getProduct: async (productKey) => {
    const response = await apiClient.get(`/products/${productKey}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await apiClient.post('/products', productData);
    return response.data;
  },

  updateProduct: async (productKey, productData) => {
    const response = await apiClient.put(`/products/${productKey}`, productData);
    return response.data;
  },

  deleteProduct: async (productKey) => {
    await apiClient.delete(`/products/${productKey}`);
  },

  // Brand Summary
  getBrandSummary: async () => {
    const response = await apiClient.get('/products/brand-summary');
    return response.data;
  },
};

// Error handling utilities
export const handleApiError = (error, context = '') => {
  const errorMessage = error.message || 'An unexpected error occurred';
  const fullMessage = context ? `${context}: ${errorMessage}` : errorMessage;
  
  console.error('API Error:', {
    context,
    message: errorMessage,
    fullError: error,
  });

  return {
    error: true,
    message: fullMessage,
    details: config.SHOW_ERROR_DETAILS ? error.message : undefined,
  };
};

export default apiService; 