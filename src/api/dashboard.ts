import { client } from "./client";

// Get Nofications
export const getDashboardCourses = async (accessToken: string) => {
  try {
    const response = await client.get("/v1/learner/dashboard/course-progress", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data; // Adjust according to your response structure
  } catch (error) {
    console.error("Error fetching dashboard courses:", error);
    throw error; // Optionally throw the error for further handling
  }
};

// Get getDashboardAssignments
export const getDashboardAssignments = async (accessToken: string) => {
  try {
    const response = await client.get("/v1/notifications", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data; // Adjust according to your response structure
  } catch (error) {
    console.error("Error fetching dashboard assignments:", error);
    throw error; // Optionally throw the error for further handling
  }
};

// Get Nofications
export const getUpcomingClasses = async (accessToken: string) => {
  try {
    const response = await client.get(
      "/v1/learner/dashboard/upcoming-class-activities",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data; // Adjust according to your response structure
  } catch (error) {
    console.error("Error fetching dashboard activities:", error);
    throw error; // Optionally throw the error for further handling
  }
};
