
const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL;

const authRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${AUTH_API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const loginUser = (credentials) =>
  authRequest('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

export const getCurrentUser = () =>
  authRequest('/me');

export const logoutUser = () =>
  authRequest('/logout', {
    method: 'POST',
  });

export const registerUser = (userData) =>
  authRequest('/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
