import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { Persons } from "~/assets/icons";
import { noContent } from "~/assets/images";
import { joinCommunity } from "~/src/api";
import { fetchCommunities, fetchUserCommunities } from "~/src/api/community";
import { useAuthStore } from "~/src/core/storage";
import { ScreenHeaderWithTabs } from "~/src/ui";
import { Text, theme } from "~/theme";

const Communities = () => {
  const [allCommunities, setAllCommunities] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token || "";

  /** Fetch All and User Communities in Parallel */
  const fetchData = async () => {
    try {
      setLoading(true);
      const [allRes, userRes] = await Promise.all([
        fetchCommunities(accessToken),
        fetchUserCommunities(accessToken),
      ]);
      setAllCommunities(allRes.data);
      setUserCommunities(userRes.data);
    } catch (error: any) {
      console.error(
        "Error fetching communities:",
        error?.response?.data?.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch both on mount
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <ScreenHeaderWithTabs
        tabs={["All", "Mine"]}
        onTabChange={handleTabChange}
        title="Community"
      />

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {(activeTab === "All" ? allCommunities : userCommunities).map(
            (community: any) => (
              <Community
                userCommunities={userCommunities}
                key={community.id}
                id={community.id}
                name={community.name}
                course_name={community.course_name}
                description={community.description}
                members={community.members}
                accessToken={accessToken}
              />
            ),
          )}
          {activeTab === "Mine" && userCommunities.length === 0 && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                marginTop: 170,
              }}
            >
              <Image source={noContent} />
              <Text
                style={{ textAlign: "center", color: "#434343", marginTop: 8 }}
              >
                You haven't joined any communities yet
              </Text>
            </View>
          )}
        </ScrollView>
      )}
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
  userCommunities,
}: any) => {
  const router = useRouter();

  const isUserInCommunity = userCommunities.some(
    (community: any) => community.id === id,
  );

  console.log(isUserInCommunity);

  const handleClick = async () => {
    if (isUserInCommunity) {
      // Navigate if user is already in the community
      router.push(`/${id}` as any);
    } else {
      try {
        await joinCommunity(accessToken, id);
      } catch (error: any) {
        console.log(error.response.data);
        Alert.alert(
          "Error",
          error?.response?.data?.message || "Something went wrong",
        );
      }
    }
  };

  return (
    <Pressable onPress={handleClick} style={styles.community}>
      <View style={styles.iconWrapper}>
        <Persons />
      </View>
      <View style={{ flex: 1 }}>
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    padding: 16,
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
  iconWrapper: {
    backgroundColor: theme.colors.borderColor,
    borderRadius: 9999,
    padding: 8,
  },
});

export default Communities;
