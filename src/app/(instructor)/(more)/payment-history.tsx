import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { GreenIconDown, RedIconUp } from "~/assets/icons";
import { getAllPaymentHistory } from "~/src/api/tutors-profile";
import { useAuthStore } from "~/src/core/storage";
import { ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const PaymentHistory = (props: Props) => {
   const authData = useAuthStore((state) => state.authData);
    const accessToken = authData?.access_token;
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)
    const [paymentHistory, setPaymentHistory ] = useState<any[]>([]); //store payment history


    useEffect(() => {
          const getPaymentHistory = async () => {
            if (!accessToken) return; // No token, no request
            setLoading(true);
            setError(null);
      
            try {
              console.log("Fetching payment history...");
              // Fetch payment
              const fetchedPaymentHistory = await getAllPaymentHistory(accessToken)
              console.log(fetchedPaymentHistory);
              

              
              setPaymentHistory(fetchedPaymentHistory.data || []) // Set fetched data
            } catch (err) {
              console.error("Error fetching data:", err);
              setError("Error fetching data");
            } finally {
              setLoading(false);
            }
          };
      
          getPaymentHistory()
        }, [accessToken]);
    
        console.log(paymentHistory);
  
  return (
    <View style={styles.container}>
      <ScreenHeader bg title="Payment History" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <Payment />
        <Payment />
        <Payment />
        <Payment />
        <Payment />
        <Payment />
        <Payment />
        <Payment />
        <Payment />
        <Payment />
        <Payment />
      </ScrollView>
    </View>
  );
};

const Payment = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        paddingVertical: 14,
        borderColor: theme.colors.borderColor,
        flex: 1,
      }}
    >
      <View style={{ rowGap: 14 }}>
        <Text style={{ color: "#434343" }}>10/05/2024</Text>
        <Text>George Brown</Text>
      </View>
      <View style={{ rowGap: 14 }}>
        <Text
          style={{
            backgroundColor: theme.colors.lightGreen,
            color: theme.colors.green,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 999,
          }}
        >
          Success
        </Text>
        <Text style={{ gap: 8 }} variant="subtitle">
          $ 100 {"  "}
          <RedIconUp />
        </Text>
      </View>
    </View>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
