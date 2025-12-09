// Local development uses setupProxy.js to route /api calls to the backend
// setupProxy intercepts /api and sends to http://35.182.1.229:6000/api
// Production uses Vercel rewrites (vercel.json) to route /api to backend
const isProduction = process.env.NODE_ENV === 'production';

// Use environment variable for backend URL if available
const backendURL = process.env.REACT_APP_API_URL || (
  isProduction
    ? '/api' // Production - use Vercel reverse proxy
    : 'http://35.182.1.229:6000'  // Local HTTP backend
);

export const BASE_URL = isProduction
  ? backendURL // Production - reverse proxy via Vercel (/api)
  : '/api'; // Local development - proxy will handle routing

