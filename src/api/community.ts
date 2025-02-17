import { client } from "./client";

export const fetchCommunities = async (accessToken: string) => {
  console.log(accessToken, "access token");

  const response = await client.get("v1/communities", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data;
};

export const joinCommunity = async (accessToken: string, id: string) => {
  console.log(accessToken, "access token");

  const response = await client.post(`v1/community-chat/${id}/join`, {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data;
};

export const fetchUserCommunities = async (accessToken: string) => {
  console.log(accessToken, "access token");

  const response = await client.get("v1/my-communities", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data;
};
