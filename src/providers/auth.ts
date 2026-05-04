import type { AuthProvider } from "@refinedev/core";
import { kyInstance } from "./data";
import {
  LOGIN_ENDPOINT,
  GET_IDENTITY_ENDPOINT,
  REGISTER_ENDPOINT,
  FORGOT_PASSWORD_ENDPOINT,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  LAST_ACTIVITY_KEY,
  LOGIN_TIME_KEY,
  SESSION_TIMEOUT,
} from "./constants";
import type {
  LoginDto,
  LoginResponse,
  GetIdentityResponse,
  RegisterDto,
  ForgotPasswordDto,
} from "../types";

export const authProvider: AuthProvider = {
  async login(params: LoginDto) {
    try {
      const response = await kyInstance
        .post(LOGIN_ENDPOINT, { json: params })
        .json<LoginResponse>();

      if (response.accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
        localStorage.setItem(LOGIN_TIME_KEY, String(Date.now()));
        localStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
      }
      if (response.refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
      }

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: error?.message || "Login failed",
        },
      };
    }
  },

  async logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(LAST_ACTIVITY_KEY);
    localStorage.removeItem(LOGIN_TIME_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  async check() {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      const lastActivity = Number(localStorage.getItem(LAST_ACTIVITY_KEY) ?? Date.now());
      if (Date.now() - lastActivity > SESSION_TIMEOUT) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(LAST_ACTIVITY_KEY);
        localStorage.removeItem(LOGIN_TIME_KEY);
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },

  async onError(error) {
    const status = error?.response?.status || error?.status;
    if (status === 401 || status === 403) {
      return {
        logout: true,
        redirectTo: "/login",
      };
    }

    return {};
  },

  async getIdentity() {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (!token) {
        return null;
      }

      const response = await kyInstance
        .get(GET_IDENTITY_ENDPOINT)
        .json<GetIdentityResponse>();

      return {
        id: response.email,
        email: response.email,
        isEmailConfirmed: response.isEmailConfirmed,
      };
    } catch (error) {
      return null;
    }
  },

  async register(params: RegisterDto) {
    try {
      await kyInstance.post(REGISTER_ENDPOINT, { json: params });

      return {
        success: true,
        redirectTo: "/login",
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          name: "RegisterError",
          message: error?.message || "Registration failed",
        },
      };
    }
  },

  async forgotPassword(params: ForgotPasswordDto) {
    try {
      await kyInstance.post(FORGOT_PASSWORD_ENDPOINT, { json: params });

      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          name: "ForgotPasswordError",
          message: error?.message || "Password reset request failed",
        },
      };
    }
  },

  async updatePassword() {
    // Update password endpoint not defined in auth configuration
    throw new Error("updatePassword not implemented");
  },

  async getPermissions() {
    // Get permissions endpoint not defined in auth configuration
    throw new Error("getPermissions not implemented");
  },
};
