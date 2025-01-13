import { client } from "./client";

export const getTutorDashBoard = async (accessToken: string) => {
  try {
    const response = await client.get(`/v1/tutor/dashboard`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const getTutorMonthlyEarnings = async (
  accessToken: string,
  year: string,
) => {
  try {
    const response = await client.get(`/v1/tutor/dashboard/monthly-earnings`, {
      params: { year },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const getTutorUpcomingClasses = async (
  accessToken: string,
  date: string,
) => {
  try {
    const response = await client.get(`/v1/tutor/dashboard/upcoming-classes`, {
      params: { date },

      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};
