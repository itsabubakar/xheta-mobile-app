// src/api/authApi.ts;

import { client } from "./client";
import { useAuthStore } from "../core/storage";

export const signUp = async (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
  time_zone: string;
}) => {
  const response = await client.post("/v1/create/account", data);
  return response.data; // Adjust according to your response structure
};

export const signIn = async (data: { email: string; password: string }) => {
  const response = await client.post("/login", data);
  return response.data; // Adjust according to your response structure
};

export const sendResetPasswordCode = async (email: string) => {
  try {
    const response = await client.post("/v1/send-code-for-reset-password", {
      email,
    });
    return response.data; // Adjust according to your response structure
  } catch (error) {
    console.error("Error sending reset password code:", error);
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
    throw error; // Optionally throw the error for further handling
  }
};

// Fetch courses function
export const fetchCourses = async (accessToken: string) => {
  console.log(accessToken, "access token");

  const response = await client.get(
    "https://xheta-api.eknoxbit.com/api/v1/learner/courses",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the bearer token
      },
    },
  );

  return response.data; // Assuming "courses" is the correct field
};
