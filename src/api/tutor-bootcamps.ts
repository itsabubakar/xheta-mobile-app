import { client } from "./client";

// Fetch all tutors function
export const getTutorBootCamps = async (accessToken: string) => {
  console.log(accessToken, "access token");

  const response = await client.get("v1/tutor/bootcamps", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const createBootCamp = async (accessToken: string, data: any) => {
  console.log(data);
  try {
    const response = await client.post("/v1/tutor/bootcamps/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating bootcamp:", error);
    throw error;
  }
};

// Fetch all tutors function
export const getTutorSingeBootCamp = async (
  accessToken: string,
  id: string,
) => {
  console.log(accessToken, "access token");

  const response = await client.get(`v1/tutor/bootcamps/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const editBootCamp = async (
  accessToken: string,
  id: string,
  data: any,
) => {
  console.log(data);
  try {
    const response = await client.post(
      `/v1/tutor/bootcamps/update/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error editing bootcamp:", error);
    throw error;
  }
};

// Fetch all tutors function
export const deleteBootCamp = async (accessToken: string, id: string) => {
  console.log(accessToken, "access token");

  const response = await client.delete(`/v1/tutor/bootcamps/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
