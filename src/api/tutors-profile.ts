import { client } from "./client";

// Fetch all more function
export const getAllCardsDetails = async (accessToken: string) => {
  console.log(accessToken, "access token");

  const response = await client.get("card-details", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const deleteCard = async (accessToken: string, id: string) => {
  console.log(accessToken, "access token");

  const response = await client.delete(`card-details/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};


export const getCardDetails = async (accessToken: string, id: string) => {
    console.log(accessToken, "access token");
  
    const response = await client.get(`card-details/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return response.data;
  };


  export const updateCard = async (accessToken: string, id: string, data:{
    card_holder_name: string,
    card_number: string,
    card_expiry_date: string,
    card_cvc: string
}) => {
    console.log(accessToken, "access token");
  
    const response = await client.post(`card-details/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return response.data;
  };


  export const saveCard = async (accessToken: string, data:{
    card_holder_name: string,
    card_number: string,
    card_expiry_date: string,
    card_cvc: string
    card_type: string
}) => {
    console.log(accessToken, "access token");
  
    const response = await client.put(`card-details`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return response.data;
  };


  export const getAllPaymentHistory = async (accessToken: string) => {
    console.log(accessToken, "access token");
  
    const response = await client.get("tutor/payments", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return response.data;
  };