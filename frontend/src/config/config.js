// Frontend Configuration
const config = {
  // API Configuration
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
  API_TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000,

  // Pagination Configuration
  DEFAULT_PAGE_SIZE: parseInt(process.env.REACT_APP_DEFAULT_PAGE_SIZE) || 10,
  MAX_PAGE_SIZE: parseInt(process.env.REACT_APP_MAX_PAGE_SIZE) || 200,
  PAGE_SIZE_OPTIONS: (process.env.REACT_APP_PAGE_SIZE_OPTIONS || '5,10,20,50,100,200').split(',').map(Number),

  // Search Configuration
  SEARCH_DEBOUNCE_MS: parseInt(process.env.REACT_APP_SEARCH_DEBOUNCE_MS) || 400,
  MIN_SEARCH_LENGTH: parseInt(process.env.REACT_APP_MIN_SEARCH_LENGTH) || 1,
  MAX_SEARCH_LENGTH: parseInt(process.env.REACT_APP_MAX_SEARCH_LENGTH) || 100,

  // UI Configuration
  TABLE_ROWS_PER_PAGE_OPTIONS: (process.env.REACT_APP_TABLE_ROWS_PER_PAGE_OPTIONS || '5,10,20,50,100,200').split(',').map(Number),
  DEFAULT_SORT_FIELD: process.env.REACT_APP_DEFAULT_SORT_FIELD || 'productKey',
  DEFAULT_SORT_DIRECTION: process.env.REACT_APP_DEFAULT_SORT_DIRECTION || 'asc',

  // Error Handling
  SHOW_ERROR_DETAILS: process.env.REACT_APP_SHOW_ERROR_DETAILS === 'true',
  ERROR_AUTO_HIDE_MS: parseInt(process.env.REACT_APP_ERROR_AUTO_HIDE_MS) || 5000,

  // Development
  ENABLE_DEBUG_LOGGING: process.env.REACT_APP_ENABLE_DEBUG_LOGGING === 'true',
};

export default config; 