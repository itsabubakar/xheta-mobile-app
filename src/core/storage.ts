import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

// Define the types for your data
export type AuthData = {
  access_token: string;
  account_activated: boolean;
  created_at: string;
  email: string;
  id: number;
  name: string;
  role: string;
  gender?: string;
  profile_image?: string;
  level_of_education?: string;
  area_of_interest?: any;
};

type AuthState = {
  authData: AuthData | null;
  isAuthenticated: boolean;
  setAuthData: (data: AuthData) => Promise<void>;
  clearAuthData: () => Promise<void>;
  hydrateAuthData: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  authData: null,
  isAuthenticated: false,

  setAuthData: async (data: AuthData) => {
    // Persist the token in SecureStore
    await SecureStore.setItemAsync("access_token", data.access_token);
    await SecureStore.setItemAsync("authData", JSON.stringify(data));

    console.log("Authentication data successfully saved:", data); // Log success message

    set({
      authData: data,
      isAuthenticated: true,
    });
  },

  clearAuthData: async () => {
    // Remove the token from storage
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("authData");

    console.log("Authentication data successfully deleted."); // Log success message

    set({
      authData: null,
      isAuthenticated: false,
    });
  },

  hydrateAuthData: async () => {
    const accessToken = await SecureStore.getItemAsync("access_token");
    const authDataString = await SecureStore.getItemAsync("authData");

    if (accessToken && authDataString) {
      const authData = JSON.parse(authDataString) as AuthData;
      set({
        authData,
        isAuthenticated: true,
      });
    } else {
      set({
        authData: null,
        isAuthenticated: false,
      });
    }
  },
}));
