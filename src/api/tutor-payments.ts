import { client } from "./client";

export const getTutorPayments = async (accessToken: string) => {
  try {
    const response = await client.get(`/v1/tutor/payments`, {
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

export const getTutorSavedCards = async (accessToken: string) => {
  try {
    const response = await client.get(`/v1/card-details`, {
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

export const addTutorSavedCard = async (accessToken: string, data: any) => {
  try {
    const response = await client.post(`/v1/card-details`, data, {
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

export const deleteTutorSavedCard = async (accessToken: string, id: string) => {
  try {
    const response = await client.delete(`/v1/card-details/${id}`, {
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
