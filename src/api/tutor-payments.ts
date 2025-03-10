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

export const getTutorBankInfo = async (accessToken: string) => {
  try {
    const response = await client.get(`/v1/tutor/bank-account-detail`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const addTutorBankInfo = async (accessToken: string, data: any) => {
  console.log(data);
  try {
    const response = await client.patch(
      `/v1/tutor/update/bank-account-detail`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};
