import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { getAllCardsDetails } from "~/src/api/tutors-profile";

import { CircularPlus, Mastercard, TrashIcon } from "~/assets/icons";
import { useAuthStore } from "~/src/core/storage";
import { ScreenHeaderWithCustomIcon } from "~/src/ui";
import { Text } from "~/theme";

type Props = object;

const PaymentBilling = (props: Props) => {
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const [cards, setCards ] = useState<any[]>([]); //store cards

  useEffect(() => {
      const getCards = async () => {
        if (!accessToken) return; // No token, no request
        setLoading(true);
        setError(null);
  
        try {
          console.log("Fetching all card details...");
          // Fetch cards
          const [fetchedCards,] = await Promise.all([
            getAllCardsDetails(accessToken),
          ]);
  
          setCards(fetchedCards.data || []); // Set fetched data
        } catch (err) {
          console.error("Error fetching data:", err);
          setError("Error fetching data");
        } finally {
          setLoading(false);
        }
      };
  
      getCards()
    }, [accessToken]);

    console.log(cards);
    

  return (
    <View style={styles.container}>
      <ScreenHeaderWithCustomIcon
        icon={<CircularPlus />}
        bg
        title="Payment & Billing"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <Text variant="subtitle">Payment cards</Text>
        <View style={{ marginTop: 16 }}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </View>
      </ScrollView>
    </View>
  );
};

const Card = () => {
  return (
    <View
      style={{
        marginBottom: 16,
        backgroundColor: "#F5F5F5",
        padding: 16,
        borderRadius: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Text style={{ fontSize: 16 }} variant="md">
          Mastercard xxxx-2345
        </Text>
        <Mastercard />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#686868" }}>Exp: 12/24</Text>
        <View
          style={{ backgroundColor: "#fff", padding: 8, borderRadius: 999 }}
        >
          <TrashIcon color="black" />
        </View>
      </View>
    </View>
  );
};

export default PaymentBilling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
