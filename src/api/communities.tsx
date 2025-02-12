import { client } from "./client";

export const joinCommunity = async (accessToken: string, id: string) => {
  const response = await client.post(`v1/community-chat/${id}/join`, {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include the bearer token
    },
  });

  return response.data;
};
