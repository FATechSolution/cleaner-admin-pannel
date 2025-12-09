// Local development: package.json proxy forwards /api to backend
// Vercel production: vercel.json reverse proxy forwards /api to backend
// Both use /api - the deployment platform handles forwarding

export const BASE_URL = '/api';

console.log('[baseUrl] BASE_URL:', BASE_URL);
console.log('[baseUrl] Environment:', process.env.NODE_ENV);







