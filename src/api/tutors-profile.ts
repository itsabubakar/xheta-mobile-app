import { client } from "./client";

// update password
export const updateTutorsProfile = async (accessToken: string, data: any) => {
  console.log(data, "data sent to backend");
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
    console.error("Error updating profile:", error);
    throw error; // Optionally throw the error for further handling
  }
};
