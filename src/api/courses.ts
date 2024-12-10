import { client } from "./client";

// Fetch courses function
export const fetchCourses = async (accessToken: string) => {
  console.log(accessToken, "access token");

  const response = await client.get("/v1/learner/courses", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data; // Assuming "courses" is the correct field
};

// Fetch categories function
export const fetchCategories = async (accessToken: string) => {
  const response = await client.get("/v1/course-categories", {
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
  console.log(courseName, "starting search");
  try {
    const response = await client.get(`/v1/learner/search-for-course`, {
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

export const fetchPersonalizedCourses = async (accessToken: string) => {
  console.log(accessToken, "access token");

  const response = await client.get("/v1/learner/personalized-learning", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data; // Assuming "courses" is the correct field
};

export const fetchEnrolledCourses = async (accessToken: string) => {
  console.log(accessToken, "access token");

  const response = await client.get("/v1/learner/enrolled-courses", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data; // Assuming "courses" is the correct field
};

export const fetchSinglePersonalizedCourse = async (
  accessToken: string,
  id: string,
) => {
  console.log(accessToken, "access token");

  const response = await client.get(`/v1/learner/personalized-learning/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data; // Assuming "courses" is the correct field
};

export const fetchSingleEnrolledCourse = async (
  accessToken: string,
  id: string,
) => {
  console.log(accessToken, "access token");

  const response = await client.get(
    `/v1/learner/enrolled-courses/${id}/lessons`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the bearer token
      },
    },
  );

  return response.data; // Assuming "courses" is the correct field
};

export const fetchSingleCourseModule = async (
  accessToken: string,
  courseId: string,
  id: string,
) => {
  console.log(accessToken, "access token");

  const response = await client.get(
    `/v1/learner/enrolled-courses/${courseId}/lessons/${id}/modules/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the bearer token
      },
    },
  );

  return response.data; // Assuming "courses" is the correct field
};

export const enrollForACourse = async (
  accessToken: string,
  id: string,
  payment_gateway: string,
) => {
  console.log(accessToken, "access token");

  const response = await client.post(
    `/v1/learner/course/enroll/${id}`,
    {
      payment_gateway,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the bearer token
      },
    },
  );

  return response.data;
};
