// src/api/authApi.ts;

import { useState, useCallback, useEffect } from "react";

import { client } from "./client";

import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SignUpData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
  time_zone: string;
};

type UseSignUpResult = {
  signUp: (data: SignUpData) => Promise<any>;
  loading: boolean;
  error: string | null;
  success: boolean;
};

export const useSignUp = (): UseSignUpResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const signUp = useCallback(
    async (
      data: SignUpData,
      onSuccess?: () => void,
      onError?: (message: string) => void
    ) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const response = await client.post("/v1/create/account", data);
        setSuccess(true);
        onSuccess?.(); // Call the success handler if provided
        return response.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred";
        setError(errorMessage);
        onError?.(errorMessage); // Call the error handler if provided
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { signUp, loading, error, success };
};

export const signIn = async (data: { email: string; password: string }) => {
  // const response = await client.post("/login", );
  // return response.data; // Adjust according to your response structure

  try {
    const response = await client.post("login", data);
    return response.data; // Adjust according to your response structure
  } catch (error: any) {
    // console.error("Error logging in:", error?.response.data);
    throw error;
  }
};

export const sendResetPasswordCode = async (email: string) => {
  try {
    const response = await client.post("/v1/send-code-for-reset-password", {
      email,
    });
    return response.data; // Adjust according to your response structure
  } catch (error: any) {
    console.error("Error sending reset password code:", error?.response);
    throw error;
  }
};

// Function to verify OTP
export const verifyOTPCode = async (code: string) => {
  const response = await client.post("/v1/verify-code", {
    code,
  });
  return response.data; // Adjust according to the actual response structure
};

// resetPassword function
export const resetPassword = async (data: {
  token: string;
  password: string;
  password_confirmation: string;
}) => {
  try {
    const response = await client.post("/v1/reset-password", data);
    return response.data; // Adjust according to your response structure
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error; //  throw the error for further handling
  }
};

export const verifyEmail = async (data: { token: string; email: string }) => {
  try {
    const response = await client.post(
      "/v1/send-code",
      { email: data.email },
      {
        headers: {
          Authorization: `Bearer ${data.token}`, // Include the bearer token
        },
      }
    );
    return response.data; // Adjust according to your response structure
  } catch (error) {
    console.error("Error verifying account:", error);
    throw error; //  throw the error for further handling
  }
};

export const verifyEmailOtp = async (data: { token: string; code: string }) => {
  try {
    const response = await client.post(
      "/v1/verify-account",
      { code: data.code },
      {
        headers: {
          Authorization: `Bearer ${data.token}`, // Include the bearer token
        },
      }
    );
    return response.data; // Adjust according to your response structure
  } catch (error) {
    console.error("Error verifying account:", error);
    throw error; //  throw the error for further handling
  }
};

export const useGoogleSignIn = () => {
  const [state, setState] = useState({
    loading: false,
    error: "",
    success: false,
  });
  const [userInfo, setUserInfo] = useState<any>(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "YOUR_ANDROID_CLIENT_ID",
    iosClientId: "YOUR_IOS_CLIENT_ID",
  });

  useEffect(() => {
    signInWithGoogle();
  }, [response]);

  const fetchUserInfo = async (token: string) => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch user info");

      const user = await res.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      setState({ loading: false, success: true, error: "" });
    } catch (error: any) {
      setState({ loading: false, error: error.message, success: false });
    }
  };

  const signInWithGoogle = useCallback(async () => {
    setState({ loading: true, error: "", success: false });

    try {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser) {
        setUserInfo(JSON.parse(storedUser));
        setState({ loading: false, success: true, error: "" });
        return JSON.parse(storedUser);
      }

      if (
        response?.type === "success" &&
        response.authentication?.accessToken
      ) {
        await fetchUserInfo(response.authentication.accessToken);
      }
    } catch (error: any) {
      setState({ loading: false, error: "Sign-in failed", success: false });
    }
  }, [response]);

  return {
    promptAsync,
    userInfo,
    loading: state.loading,
    error: state.error,
    success: state.success,
  };
};
