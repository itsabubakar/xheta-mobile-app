import { client } from "./client";

export const fetchCatgeories = async (accessToken: string) => {
  const response = await client.get("v1/course-categories", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data;
};
