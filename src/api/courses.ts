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

  return response.data;
};

// Fetch courses based on user input
export const searchForCourse = async (
  courseName: string,
  accessToken: string,
) => {
  try {
    const response = await client.get(`v1/learner/search-for-course`, {
      params: { course_name: courseName }, // Attach query parameters
      headers: {
        Authorization: `Bearer ${accessToken}`, // Use dynamic token
      },
    });

    return response.data; // Adjust based on your API's response structure
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error; // Ensure errors are handled properly
  }
};
