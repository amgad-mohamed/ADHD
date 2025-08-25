# Test Accounts for ADHD Focus App

This document contains test accounts you can use to test the authentication functionality without needing a backend server.

## Pre-existing Test Accounts

### 1. Individual User
- **Email**: `john@example.com`
- **Password**: Any password (e.g., `password123`)
- **Role**: User
- **Name**: John Doe

### 2. Doctor Account
- **Email**: `sarah@example.com`
- **Password**: Any password (e.g., `password123`)
- **Role**: Doctor
- **Name**: Dr. Sarah Johnson

### 3. Parent Account
- **Email**: `maria@example.com`
- **Password**: Any password (e.g., `password123`)
- **Role**: Parent
- **Name**: Maria Smith

## How to Test

### Login Testing
1. Go to `/login` page
2. Use any of the above email addresses
3. Enter any password (the mock system accepts any password for existing users)
4. Click "Sign in"
5. You should be redirected to the dashboard

### Registration Testing
1. Go to `/register` page
2. Try registering with a new email address (not the ones above)
3. Fill in all required fields
4. Select a role
5. Click "Create account"
6. You should be redirected to the dashboard

### Error Testing
1. Try logging in with a non-existent email
2. Try registering with an email that already exists
3. Try accessing protected pages without logging in

## Features to Test

### Authentication Flow
- ✅ Login with existing accounts
- ✅ Register new accounts
- ✅ Logout functionality
- ✅ Protected route redirection
- ✅ Token persistence (refresh page)

### User Roles
- ✅ Different user types (user, doctor, parent)
- ✅ Role-based interface differences
- ✅ Profile management

### Profile Management
- ✅ View profile information
- ✅ Edit profile details
- ✅ Change password (mock functionality)
- ✅ Upload avatar (mock functionality)

### Navigation
- ✅ User dropdown menu
- ✅ Profile link
- ✅ Logout link
- ✅ Dashboard access

## Mock Data Details

The mock system includes:
- **3 pre-existing users** with different roles
- **Token-based authentication** (stored in localStorage)
- **Profile management** with mock data
- **Error handling** for invalid credentials
- **API simulation** with realistic delays

## Notes

- All passwords are accepted for existing users (for demo purposes)
- New registrations create new mock users
- Data persists in localStorage until logout
- No real backend required for testing
- All API calls are simulated with delays

## Troubleshooting

If you encounter issues:
1. Clear localStorage: `localStorage.clear()` in browser console
2. Check browser console for errors
3. Ensure you're using the correct email addresses
4. Try refreshing the page after login

