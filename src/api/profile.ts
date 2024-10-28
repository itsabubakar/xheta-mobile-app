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

export const fetchAccomplishments = async (accessToken: string) => {
  const response = await client.get("v1/learner/accomplishments", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data;
};

// createComplaint function
export const createComplaint = async (
  accessToken: string,
  data: {
    email: string;
    complaint: string;
    phone: string;
  },
) => {
  try {
    const response = await client.post(
      "/v1/customer-support/complaint/create",
      data, // Data should be passed here as the second argument
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the bearer token in the third argument (config)
        },
      },
    );

    return response.data; // Adjust according to your response structure
  } catch (error) {
    console.error("Error creating complaint:", error);
    throw error; // Optionally throw the error for further handling
  }
};

// update password
export const updatePassword = async (
  accessToken: string,
  data: {
    old_password: string;
    password: string;
    password_confirmation: string;
  },
) => {
  try {
    const response = await client.put(
      "/v1/learner/password/update",
      data, // Data should be passed here as the second argument
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the bearer token in the third argument (config)
        },
      },
    );

    return response.data; // Adjust according to your response structure
  } catch (error) {
    console.error("Error updating password:", error);
    throw error; // Optionally throw the error for further handling
  }
};

// update password
export const updateProfile = async (accessToken: string, data: any) => {
  try {
    const response = await client.put(
      "/v1/learner/profile/update",
      data, // Data should be passed here as the second argument
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the bearer token in the third argument (config)
        },
      },
    );

    return response.data; // Adjust according to your response structure
  } catch (error) {
    console.error("Error updating password:", error);
    throw error; // Optionally throw the error for further handling
  }
};
