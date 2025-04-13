import {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
} from "react";
import { SafeUser } from "../types/ApiResponse/auth";
import authService from "../api/authService";
import {
  setToken,
  removeToken,
  getUserData,
  setUserData,
  removeUserData,
} from "../utils/storage";
import { Auth as AuthRequest } from "../types/APIRequest";

interface AuthContextType {
  isAuthenticated: boolean;
  user: SafeUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  register: (
    email: string,
    password: string,
    name?: string
  ) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  resetPassword: (
    token: string,
    password: string,
    confirmPassword: string
  ) => Promise<boolean>;
  clearError: () => void;
}

const DEFAULT_VALUES: AuthContextType = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  login: async () => false,
  logout: async () => false,
  register: async () => false,
  requestPasswordReset: async () => false,
  resetPassword: async () => false,
  clearError: () => {},
};

export const AuthContext = createContext<AuthContextType>(DEFAULT_VALUES);

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<SafeUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userData = await getUserData();

        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);

          // Optionally verify token validity with the server
          try {
            const response = await authService.getCurrentUser();
            if (response.success) {
              setUser(response.data);
              await setUserData(response.data);
            } else {
              // Token might be invalid
              await handleLogout();
            }
          } catch (err) {
            // Handle API error but don't necessarily log out
            console.error("Error refreshing user data", err);
          }
        }
      } catch (err) {
        console.error("Error checking auth status", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const loginPayload: AuthRequest.Login["body"] = { email, password };
      const response = await authService.login(loginPayload);

      if (response.success) {
        const { token, user } = response.data;
        await setToken(token);
        await setUserData(user);
        setUser(user);
        setIsAuthenticated(true);
        return true;
      } else {
        setError(response.error || "Login failed");
        return false;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during login");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (): Promise<boolean> => {
    await removeToken();
    await removeUserData();
    setUser(null);
    setIsAuthenticated(false);
    return true;
  };

  const logout = async (): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await authService.logout();
      return await handleLogout();
    } catch (err) {
      console.error("Error during logout", err);
      // Still remove user data even if API call fails
      return await handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name?: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const registerPayload: AuthRequest.Register["body"] = {
        email,
        password,
        name,
      };
      const response = await authService.register(registerPayload);

      if (response.success) {
        // If auto-login after registration
        // return await login(email, password);

        // Or just return success
        return true;
      } else {
        setError(response.error || "Registration failed");
        return false;
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred during registration"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  // New method for password reset request
  const requestPasswordReset = async (email: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const payload: AuthRequest.PasswordReset["body"] = { email };
      const response = await authService.requestPasswordReset(payload);

      if (response.success) {
        return true;
      } else {
        setError(response.error || "Password reset request failed");
        return false;
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "An error occurred during password reset request"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  // New method for password reset
  const resetPassword = async (
    token: string,
    password: string,
    confirmPassword: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const payload: AuthRequest.PasswordUpdate["body"] = {
        password,
        confirmPassword,
      };
      const response = await authService.resetPassword(token, payload);

      if (response.success) {
        return true;
      } else {
        setError(response.error || "Password reset failed");
        return false;
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred during password reset"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  const values = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    register,
    requestPasswordReset,
    resetPassword,
    clearError,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  return context;
};
