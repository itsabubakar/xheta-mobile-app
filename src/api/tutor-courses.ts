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
