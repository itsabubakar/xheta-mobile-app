import { client } from "./client";

// Fetch all tutors function
export const fetchTutors = async (accessToken: string) => {
  console.log(accessToken, "access token");

  const response = await client.get("v1/learner/tutors", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data;
};

// Fetch tutors based on user input
export const searchForTutors = async (
  tutorName: string,
  accessToken: string,
) => {
  try {
    const response = await client.get(`v1/learner/search-for-course`, {
      params: { course_name: tutorName }, // Attach query parameters
      headers: {
        Authorization: `Bearer ${accessToken}`, // Use dynamic token
      },
    });

    return response.data; // Adjust based on your API's response structure
  } catch (error) {
    console.error("Error fetching tutor:", error);
    throw error; // Ensure errors are handled properly
  }
};

export const fetchOneTutor = async (accessToken: string, id: string) => {
  console.log(id);
  const response = await client.get(`v1/learner/tutor/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data;
};

// bookTutor function
export const bookTutor = async (
  accessToken: string,
  data: {
    date: string;
    start_time: string;
    end_time: string;
    time_zone: string;
    tutor_id: string;
    message_from_learner: string;
  },
) => {
  console.log(data, "data");
  try {
    const response = await client.post(
      "/v1/learner/bookings",
      [data], // Data passed here as the second argument
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the bearer token in the third argument (config)
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

export const makePaymentToBookTutor = async (
  accessToken: string,
  id: string,
  payment_gateway: string,
) => {
  console.log(accessToken, "access token");

  const response = await client.post(
    `/v1/learner/bookings/make-payment/${id}`,
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
