import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { GreenIconDown, RedIconUp } from "~/assets/icons";
import { noContent } from "~/assets/images";
import { getTutorPayments } from "~/src/api/tutor-payments";
import { useAuthStore } from "~/src/core/storage";
import { ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const PaymentHistory = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token || "";
  const [payments, setPayments] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getTutorPayments(accessToken);
      setPayments(res.data);
    } catch (error: any) {
      console.error("Error fetching data:", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: theme.colors.white,
        }}
      >
        <View>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScreenHeader bg title="Payment History" />
      {payments?.length === 0 && (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Image source={noContent} />
          <Text style={{ textAlign: "center", color: "#434343", marginTop: 8 }}>
            You don’t have any payments yet
          </Text>
        </View>
      )}
      {payments.length > 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 16,
          }}
        >
          {payments?.map((item: any) => <Payment key={item.id} />)}
        </ScrollView>
      )}
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
