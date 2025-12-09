// Always use /api for local development - setupProxy.js will forward to backend
// This avoids browser's unsafe port blocking (port 6000 is blocked by browsers)

export const BASE_URL = '/api';

console.log('[baseUrl] BASE_URL:', BASE_URL);
console.log('[baseUrl] Environment:', process.env.NODE_ENV);
console.log('[baseUrl] Using local proxy - backend forwarded by setupProxy.js');







