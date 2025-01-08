import { client } from "./client";

export const createCourse = async (accessToken: string, data: any) => {
  try {
    const response = await client.post("/v1/tutor/course/create", data, {
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

export const addModule = async (
  accessToken: string,
  courseId: string,
  data: any,
) => {
  try {
    const response = await client.post(
      `/v1/tutor/course/module/add/${courseId}`,
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
    console.error("Error creating course:", error);
    throw error;
  }
};

export const singleCourseDetail = async (
  accessToken: string,
  courseId: string,
) => {
  // tutor/course/47
  try {
    const response = await client.get(`/v1/tutor/course/${courseId}`, {
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

export const getTutorCourses = async (accessToken: string) => {
  console.log(accessToken, "access token");

  const response = await client.get("/v1/tutor/courses", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const editCourseModule = async (
  accessToken: string,
  courseId: string,
  moduleId: string,
  data: any,
) => {
  try {
    const response = await client.put(
      `/v1/tutor/course/module/edit/${courseId}/${moduleId}`,
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
    console.error("Error creating course:", error);
    throw error;
  }
};

export const editCourse = async (
  accessToken: string,
  courseId: string,
  data: any,
) => {
  try {
    const response = await client.post(
      `/v1/tutor/course/update/${courseId}`,
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
    console.error("Error creating course:", error);
    throw error;
  }
};

export const addCourseAssignment = async (
  accessToken: string,
  courseId: string,
  data: any,
) => {
  try {
    const response = await client.post(
      `/v1/tutor/lesson/${courseId}/assignment/create`,
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
    console.error("Error creating assignment:", error);
    throw error;
  }
};

export const deleteCourseModule = async (
  accessToken: string,
  courseId: string,
) => {
  try {
    const response = await client.delete(
      `/v1/tutor/course/module/delete/${courseId}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
};
