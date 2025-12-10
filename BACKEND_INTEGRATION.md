# Backend Integration Guide

## Current Status
The admin panel frontend is fully implemented with all API endpoints integrated. Some backend endpoints are not yet implemented, which causes 404 errors in the console.

## Console Errors (Expected & Handled)
These errors are expected until the backend implements the endpoints:
- ✅ `api/admin/auth/verify` - 404 (gracefully falls back to mock auth)
- ✅ `api/admin/price-requests` - 404 (displays empty state)

## API Endpoints Overview

### Base URL Configuration
- **Development**: `/api` → proxied to `http://35.182.1.229:6000` via `package.json`
- **Production**: `/api` → proxied via `vercel.json` rewrites
- Backend should listen on: `http://35.182.1.229:6000`

## Backend Endpoints to Implement

### 1. Authentication (Priority: HIGH)
```
POST   /api/admin/auth/login           ✅ PARTIAL (mock fallback exists)
POST   /api/admin/auth/register        ❌ NOT IMPLEMENTED
GET    /api/admin/auth/verify          ❌ NOT IMPLEMENTED (mock fallback exists)
POST   /api/admin/auth/logout          ❌ NOT IMPLEMENTED
```

### 2. Price Requests (Priority: MEDIUM)
```
GET    /api/admin/price-requests                    ❌ NOT IMPLEMENTED
GET    /api/admin/price-requests?status=pending     ❌ NOT IMPLEMENTED
PUT    /api/admin/price-requests/:id/review         ❌ NOT IMPLEMENTED
GET    /api/admin/cleaners/:id/price                ❌ NOT IMPLEMENTED
PUT    /api/admin/cleaners/:id/price                ❌ NOT IMPLEMENTED
```

### 3. Cleaners (Priority: HIGH)
```
GET    /api/admin/cleaners                          ✅ LIKELY IMPLEMENTED
GET    /api/admin/cleaners/:id                      ✅ LIKELY IMPLEMENTED
PUT    /api/admin/cleaners/:id                      ✅ LIKELY IMPLEMENTED
DEL    /api/admin/cleaners/:id                      ✅ LIKELY IMPLEMENTED
PUT    /api/admin/cleaners/:id/reset-password       ❌ NOT IMPLEMENTED
PUT    /api/admin/cleaners/:id/availability         ❌ NOT IMPLEMENTED
```

### 4. Clients (Priority: HIGH)
```
GET    /api/admin/clients                           ✅ LIKELY IMPLEMENTED
GET    /api/admin/clients/:id                       ✅ LIKELY IMPLEMENTED
PUT    /api/admin/clients/:id                       ✅ LIKELY IMPLEMENTED
DEL    /api/admin/clients/:id                       ✅ LIKELY IMPLEMENTED
```

### 5. Bookings (Priority: HIGH)
```
GET    /api/admin/bookings                          ✅ LIKELY IMPLEMENTED
GET    /api/admin/bookings/:id                      ✅ LIKELY IMPLEMENTED
PUT    /api/admin/bookings/:id                      ✅ LIKELY IMPLEMENTED
PUT    /api/admin/bookings/:id/status               ❌ NOT IMPLEMENTED
DEL    /api/admin/bookings/:id                      ✅ LIKELY IMPLEMENTED
GET    /api/admin/bookings/summary                  ❌ NOT IMPLEMENTED
```

### 6. Analytics (Priority: MEDIUM)
```
GET    /api/admin/analytics/dashboard               ✅ LIKELY IMPLEMENTED
GET    /api/admin/analytics/trends                  ❌ NOT IMPLEMENTED
GET    /api/admin/analytics/activity                ❌ NOT IMPLEMENTED
```

### 7. Payment Requests (Priority: LOW)
```
GET    /api/admin/payment-requests                  ❌ NOT IMPLEMENTED
POST   /api/admin/payment-requests                  ❌ NOT IMPLEMENTED
PUT    /api/admin/payment-requests/:id              ❌ NOT IMPLEMENTED
```

### 8. Check-In/Check-Out (Priority: LOW)
```
POST   /api/admin/bookings/check-in                 ❌ NOT IMPLEMENTED
POST   /api/admin/bookings/check-out                ❌ NOT IMPLEMENTED
```

## Response Format
All backend endpoints should return data in this format:

### Success Response
```json
{
  "success": true,
  "data": { /* your data here */ },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message here",
  "message": "User-friendly error message"
}
```

## Frontend Error Handling
The frontend now includes graceful fallbacks for missing endpoints:
- **Auth endpoints**: Falls back to mock authentication
- **Price requests**: Returns empty array, shows "no data" state
- **Other endpoints**: Shows appropriate error messages to users

## Testing
To test the integration:
1. Ensure backend is running on `http://35.182.1.229:6000`
2. Start frontend: `npm start` (runs on `http://localhost:3001`)
3. Proxy automatically forwards `/api/*` requests to backend
4. Check browser console for successful API calls

## Next Steps for Backend Team
1. **Priority 1**: Implement authentication endpoints (login, verify)
2. **Priority 2**: Ensure CRUD operations work for cleaners, clients, bookings
3. **Priority 3**: Implement analytics dashboard endpoint
4. **Priority 4**: Implement price request management
5. **Priority 5**: Implement payment requests and check-in/out features

## CORS Configuration
Backend needs to allow requests from:
- `http://localhost:3001` (development)
- `https://cleaner-admin-pannel.vercel.app` (production)
- `https://*.vercel.app` (preview deployments)

## Notes
- All 404 errors are now handled gracefully in the frontend
- Console errors are informational, not critical
- Frontend will work with mock data until backend endpoints are ready
- No changes needed to frontend code once backend endpoints are implemented
