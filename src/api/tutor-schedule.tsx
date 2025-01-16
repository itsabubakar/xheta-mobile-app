import { client } from "./client";

export const getTutorBookedClasses = async (
  accessToken: string,
  date: string,
) => {
  try {
    const response = await client.get(`/v1/tutor/booked-classes`, {
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
