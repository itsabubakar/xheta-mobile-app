import { client } from "./client";

// Fetch courses function
export const fetchCourses = async (accessToken: string) => {
  console.log(accessToken, "access token");

  const response = await client.get("v1/learner/courses", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data; // Assuming "courses" is the correct field
};

// Fetch categories function
export const fetchCategories = async (accessToken: string) => {
  const response = await client.get("v1/course-categories", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data; // Adjust based on your API's response structure
};
