import { client } from "./client";

// Fetch all tutors function
export const getTutorBootCamps = async (accessToken: string) => {
  console.log(accessToken, "access token");

  const response = await client.get("v1/tutor/bootcamps", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const createBootCamp = async (accessToken: string, data: any) => {
  console.log(data);
  try {
    const response = await client.post("/v1/tutor/bootcamps/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data; // Adjust according to your response structure
  } catch (error) {
    console.error("Error creating bootcamp:", error);
    throw error; // Optionally throw the error for further handling
  }
};

// Fetch all tutors function
export const getTutorSingeBootCamp = async (
  accessToken: string,
  id: string,
) => {
  console.log(accessToken, "access token");

  const response = await client.get(`v1/tutor/bootcamps/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
