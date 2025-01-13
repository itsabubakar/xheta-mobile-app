import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import {
  SquircleCancelledClasses,
  SquircleCompletedClasses,
  SquircleCourses,
  SquircleLearner,
  SquircleStar,
  StarIcon,
} from "~/assets/icons";
import SquircleDollar from "~/assets/icons/squircle-dollar";
import { Text, theme } from "~/theme";

type Props = object;

const Hero = ({ dashboardData }: any) => {
  return (
    <View>
      <Withdraw wallet={dashboardData?.wallet_balance} />
      <View style={{ paddingTop: 24, flexDirection: "row", gap: 16 }}>
        <Cube
          icon={<SquircleDollar />}
          text="Hourly charges"
          number={dashboardData?.tutor_hourly_charge}
        />
        <Cube
          icon={<SquircleCourses />}
          text="Created courses"
          number={dashboardData?.created_courses}
        />
      </View>
      <View style={{ paddingTop: 16, flexDirection: "row", gap: 16 }}>
        <Cube
          icon={<SquircleLearner />}
          text="Personalized learners"
          number={dashboardData?.personalized_learners}
        />
        <Cube
          icon={<SquircleCompletedClasses />}
          text="Completed classes"
          number={dashboardData?.completed_classes}
        />
      </View>
      <View style={{ paddingTop: 16, flexDirection: "row", gap: 16 }}>
        <Cube
          icon={<SquircleCancelledClasses />}
          text="Cancelled classes"
          number={dashboardData?.canceled_classes}
        />
        <Cube
          icon={<SquircleStar />}
          text="Platform rating"
          number={dashboardData?.platform_ratings}
        />
      </View>
    </View>
  );
};

export default Hero;

const Cube = ({
  text,
  number,
  icon,
}: {
  text: string;
  number: number;
  icon?: React.ReactNode;
}) => {
  return (
    <View
      style={{
        borderColor: "#D2D2D266",
        borderWidth: 1,
        padding: 16,
        borderRadius: 16,
        flex: 1,
        flexDirection: "row",
        gap: 8,
      }}
    >
      {icon}
      <View
        style={{
          flex: 1,
        }}
      >
        <Text>{text}</Text>
        <Text
          style={{
            color: theme.colors.primary,
            fontSize: 20,
            fontFamily: "AeonikMedium",
            marginTop: 4,
          }}
        >
          {number}
        </Text>
      </View>
    </View>
  );
};

const Withdraw = ({ wallet }: any) => {
  const router = useRouter();
  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        padding: 16,
        borderRadius: 16,
      }}
    >
      <Text
        style={{
          marginBottom: 24,
          color: "white",
        }}
      >
        Available balance
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontFamily: "AeonikBold",
          }}
        >
          #{wallet || 0}
        </Text>
        <Pressable
          onPress={() => router.push("/wallet")}
          style={{
            backgroundColor: "#CDD7D8",
            paddingVertical: 8,
            paddingHorizontal: 14,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              fontFamily: "AeonikBold",
            }}
          >
            Withdraw
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
