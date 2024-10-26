import { client } from "./client";

// Fetch categories function
export const fetchPreference = async (accessToken: string) => {
  const response = await client.get("v1/user-preference", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data;
};

export const updatePreference = async (
  accessToken: string,
  key: string,
  value: boolean,
) => {
  try {
    const body = { [key]: value }; // Use computed property syntax

    const response = await client.patch("v1/update-preference", body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating preference:", error);
    throw error;
  }
};
