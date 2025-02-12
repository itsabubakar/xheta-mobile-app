import { client } from "./client";

// update password
export const updateTutorsProfile = async (accessToken: string, data: any) => {
  console.log(data, "data sent to backend");
  try {
    const response = await client.put(
      "/v1/tutor/profile/update",
      data, // Data should be passed here as the second argument
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the bearer token in the third argument (config)
        },
      },
    );

    return response.data; // Adjust according to your response structure
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error; // Optionally throw the error for further handling
  }
};

export const updateTutorsPreference = async (
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

export const updateTutorsPassword = async (
  accessToken: string,
  data: {
    old_password: string;
    password: string;
    password_confirmation: string;
  },
) => {
  try {
    const response = await client.put(
      "/v1/tutor/password/update",
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

export const updateTutorsProfilePicture = async (
  accessToken: string,
  data: any,
) => {
  try {
    const response = await client.post("/v1/tutor/profile/image/update", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data; // Adjust according to your response structure
  } catch (error) {
    console.error("Error updating profile image:", error);
    throw error; // Optionally throw the error for further handling
  }
};

export const fetchTutorsProfilePicture = async (accessToken: string) => {
  try {
    const response = await client.get("/v1/tutor/fetch/profile-image", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data; // Adjust according to your response structure
  } catch (error) {
    console.error("Error fetching profile picture:", error);
  }
};
