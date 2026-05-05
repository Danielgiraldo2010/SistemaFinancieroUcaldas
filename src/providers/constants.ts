export const API_URL = import.meta.env.MODE === 'production'
  ? (import.meta.env.VITE_BACKEND_URL ?? "/")
  : "/";

export const APP_NAME = import.meta.env.VITE_APP_NAME ?? "SAPFIAI";
export const TOKEN_REFRESH_THRESHOLD = Number(import.meta.env.VITE_TOKEN_REFRESH_THRESHOLD ?? 300000);
export const SESSION_TIMEOUT = Number(import.meta.env.VITE_SESSION_TIMEOUT ?? 1800000);

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const LAST_ACTIVITY_KEY = "last_activity_at";
export const LOGIN_TIME_KEY = "login_time_at";

export const LOGIN_ENDPOINT = "login";
export const REGISTER_ENDPOINT = "register";
export const FORGOT_PASSWORD_ENDPOINT = "forgotPassword";
export const GET_IDENTITY_ENDPOINT = "api/identity/me";
export const REFRESH_TOKEN_ENDPOINT = "refresh";
