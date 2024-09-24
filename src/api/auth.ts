// src/api/authApi.ts;

import { client } from "./client";

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
