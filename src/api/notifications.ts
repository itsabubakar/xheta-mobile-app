import { client } from "./client";

// Get Nofications
export const getNotifications = async (accessToken: string) => {
  try {
    const response = await client.get("/v1/notifications", {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the bearer token in the third argument (config)
      },
    });

    return response.data; // Adjust according to your response structure
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error; // Optionally throw the error for further handling
  }
};
