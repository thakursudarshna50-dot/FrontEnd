import axios from 'axios';
let accessToken = null;
let refreshToken = null;

export function setTokens({ access, refresh }) {
  accessToken = access;
  refreshToken = refresh;
}

function isTokenExpired(token) {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000; 
    return Date.now() > expiry;
  } catch {
    return true;
  }
}

const apiClient = axios.create({
  baseURL: 'https://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(newAccessToken) {
  refreshSubscribers.forEach(callback => callback(newAccessToken));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // If no token or token expired, try to refresh
    const cookies = document.cookie
      .split('; ')
      .reduce((prev, curr) => {
        const [key, value] = curr.split('=');
        prev[key] = decodeURIComponent(value);
        return prev;
      }, {});

    if (!cookies.accessToken || isTokenExpired(cookies.accessToken)) {
      if (!cookies.refreshToken) {
        // No refresh token, can't refresh
        return Promise.reject(new Error('No refresh token available'));
      }

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const response = await axios.post('https://localhost:5000/api/user/refresh', {
            refreshToken: cookies.refreshToken,
          });

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

          setTokens({ access: newAccessToken, refresh: newRefreshToken });
          isRefreshing = false;
          onRefreshed(newAccessToken);

          document.cookie = `accessToken=${newAccessToken}; path=/; max-age=${60 * 60 * 24}`;
          document.cookie = `refreshToken=${newRefreshToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
        } catch (err) {
          isRefreshing = false;
          return Promise.reject(err);
        }
      }

      return new Promise((resolve) => {
        addRefreshSubscriber((newAccessToken) => {
          config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          resolve(config);
        });
      });
    }

    config.headers['Authorization'] = `Bearer ${cookies.accessToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;