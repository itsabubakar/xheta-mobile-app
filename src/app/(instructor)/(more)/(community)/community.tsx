import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { Persons } from "~/assets/icons";
import { joinCommunity } from "~/src/api";
import { fetchCommunities } from "~/src/api/community";
import { useAuthStore } from "~/src/core/storage";
import { ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const authData = useAuthStore((state) => state.authData);
  const [loading, setLoading] = useState(true);
  const accessToken = authData?.access_token || "";

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetchCommunities(accessToken);
      setCommunities(res.data);
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

  console.log(communities);
  console.log(communities);
  return (
    <View style={styles.container}>
      <ScreenHeader bg title="Community" />

      <ScrollView
        contentContainerStyle={{
          padding: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {communities?.map((community: any) => (
          <Community
            key={community.id}
            id={community.id}
            name={community.name}
            course_name={community.course_name}
            description={community.description}
            members={community.members}
            accessToken={accessToken}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const Community = ({
  name,
  course_name,
  description,
  members,
  id,
  accessToken,
}: any) => {
  const router = useRouter();

  const handleClick = async () => {
    // community-chat/1/join
    // router.push(`/community-chat/${id}/join`);
    console.log(id);
    try {
      const res = await joinCommunity(accessToken, id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Pressable onPress={handleClick} style={styles.community}>
      <View
        style={{
          backgroundColor: theme.colors.borderColor,
          borderRadius: 9999,
          padding: 8,
        }}
      >
        <Persons />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={{ color: "#1D1D1D", marginBottom: 8 }} variant="md">
          {name}
        </Text>
        <Text variant="sm" numberOfLines={2} ellipsizeMode="tail">
          {description || "No description available"}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  community: {
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 16,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
  },
});

export default Communities;
