import { client } from "./client";

// Fetch courses function
export const fetchBootcamps = async (accessToken: string) => {
  const response = await client.get("v1/learner/bootcamps", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data; // Assuming "courses" is the correct field
};

//

export const fetchOneBootcamp = async (accessToken: string, id: string) => {
  console.log(id);
  const response = await client.get(`v1/learner/bootcamps/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data; // Assuming "courses" is the correct field
};
