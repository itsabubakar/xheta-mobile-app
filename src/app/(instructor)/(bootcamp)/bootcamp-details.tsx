import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import LottieView from "lottie-react-native";
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
import Modal from "react-native-modal";

import { greenTick } from "~/assets/animations";
import { CircleX, ExclamationIcon, OptionsIcon } from "~/assets/icons";
import {
  deleteBootCamp,
  getTutorSingeBootCamp,
} from "~/src/api/tutor-bootcamps";
import { useAuthStore } from "~/src/core/storage";
import { Button, ScreenHeaderWithCustomIcon } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const BootcampDetails = (props: Props) => {
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [deleteModuleModal, setDeleteModuleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token || "";
  const [bootCampInfo, setBootcampInfo] = useState<any>();
  const [bootCampDeleted, setShowBootCampDeleted] = useState(false);

  let { id, isDraft, draftData } = useLocalSearchParams();

  console.log(isDraft);

  if (Array.isArray(id)) {
    id = id[0]; // Ensure it's a string
  }

  if (!id || typeof id !== "string") {
    console.error("Invalid id parameter");
  }

  // Parse draft data if it's a draft
  useEffect(() => {
    if (isDraft === "true" && draftData) {
      setBootcampInfo(JSON.parse(draftData as string));
    } else if (id) {
      fetchBootcampFromAPI();
    }
  }, [id, isDraft, draftData]);

  console.log(bootCampInfo?.participants, "info");

  const fetchBootcampFromAPI = async () => {
    setLoading(true);
    try {
      const res = await getTutorSingeBootCamp(accessToken, id as string);
      setBootcampInfo(res.data);
    } catch (error) {
      console.error("Failed to fetch bootcamp:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    setDeleteModuleModal(false);

    if (isDraft === "true") {
      // Handle local draft deletion
      try {
        // Fetch existing drafts
        const existingDrafts =
          await SecureStore.getItemAsync("bootcamp_drafts");
        const drafts = existingDrafts ? JSON.parse(existingDrafts) : [];

        // Filter out the draft with the matching ID
        const updatedDrafts = drafts.filter(
          (draft: any) => String(draft.id) !== String(id),
        );

        // Save the updated drafts back to SecureStore
        await SecureStore.setItemAsync(
          "bootcamp_drafts",
          JSON.stringify(updatedDrafts),
        );

        console.log("Draft deleted successfully:", id);
        setShowBootCampDeleted(true); // Show confirmation modal
      } catch (error) {
        console.error("Failed to delete draft:", error);
        Alert.alert("Error", "Failed to delete draft. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      // Handle API bootcamp deletion
      try {
        setLoading(true);
        const res = await deleteBootCamp(accessToken, id);
        setLoading(false);
        console.log(res.data);
        setShowBootCampDeleted(true); // Show confirmation modal
      } catch (error) {
        console.log("Failed to delete bootcamp:", error);
        Alert.alert("Error", "Failed to delete bootcamp. Please try again.");
        setLoading(false);
      }
    }
  };

  const handleRoutingBack = () => {
    setShowBootCampDeleted(false);
    router.replace({
      pathname: "/bootcamp",
      params: { refetch: "true" }, // Add a refetch query param
    });
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScreenHeaderWithCustomIcon
        buttonFunction={() => setShowMenuModal(true)}
        icon={<OptionsIcon />}
        bg
        title="Bootcamp details"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={
              isDraft === "true"
                ? { uri: bootCampInfo?.coverImage?.uri } // Use local image for drafts
                : { uri: bootCampInfo?.cover_image }
            }
          />
        </View>
        <View style={{ marginTop: 16, gap: 4 }}>
          <Text variant="subtitle">{bootCampInfo?.title}</Text>
          <Text>{bootCampInfo?.description}</Text>
        </View>

        <View style={{ marginTop: 8, gap: 6 }}>
          <Text style={{ fontSize: 16 }}>
            Date:{" "}
            <Text style={{ color: "#1D1D1D" }}>
              {isDraft !== "true" && bootCampInfo?.start_and_end_date}
              {isDraft && bootCampInfo?.startDate} to{" "}
              {isDraft && bootCampInfo?.endDate}
            </Text>
          </Text>
          <Text style={{ fontSize: 16 }}>
            Time:{" "}
            <Text variant="subtitle" style={{ color: "#1D1D1D" }}>
              {isDraft === "true"
                ? bootCampInfo?.startTime
                : bootCampInfo?.formatted_start_time}{" "}
              to{" "}
              {isDraft === "true"
                ? bootCampInfo?.endTime
                : bootCampInfo?.formatted_end_time}
            </Text>
          </Text>

          <Text variant="normal_bold" style={{ fontSize: 20 }}>
            #{bootCampInfo?.price}
          </Text>
        </View>

        {isDraft === "true" ? <Text>Draft</Text> : <Text>Published</Text>}

        {isDraft !== "true" && (
          <View style={{ marginTop: 24 }}>
            <Text
              variant="subtitle"
              style={{ color: "#1D1D1D", marginBottom: 8 }}
            >
              Participants
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* Column 1 - Learner's Name */}
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    backgroundColor: "#EDEDED",
                    padding: 14,
                    paddingBottom: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: "#D2D2D266",
                  }}
                >
                  <Text
                    variant="subtitle"
                    style={{ color: "#434343", fontSize: 12 }}
                  >
                    LEARNER'S NAME
                  </Text>
                </View>
                {bootCampInfo?.participants?.map(
                  (participant: any, index: any) => (
                    <Text
                      key={index}
                      style={{
                        padding: 16,
                        borderBottomWidth: 1,
                        borderBottomColor: "#D2D2D266",
                      }}
                    >
                      {participant.name || "N/A"}
                    </Text>
                  ),
                )}
              </View>

              {/* Column 2 - Email */}
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    backgroundColor: "#EDEDED",
                    padding: 14,
                    paddingBottom: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: "#D2D2D266",
                  }}
                >
                  <Text
                    variant="subtitle"
                    style={{ color: "#434343", fontSize: 12 }}
                  >
                    EMAIL
                  </Text>
                </View>
                {bootCampInfo?.participants?.map(
                  (participant: any, index: any) => (
                    <Text
                      key={index}
                      style={{
                        padding: 16,
                        borderBottomWidth: 1,
                        borderBottomColor: "#D2D2D266",
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {participant.email || "N/A"}
                    </Text>
                  ),
                )}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* menu modal */}
      <Modal
        animationIn="slideInRight" // Slide in from the right
        animationOut="slideOutRight" // Slide out to the right
        onBackdropPress={() => setShowMenuModal(false)}
        isVisible={showMenuModal}
      >
        <View
          style={{
            // marginTop: "-180%",
            backgroundColor: theme.colors.white,
            position: "absolute",
            top: 60,
            right: 0,

            paddingVertical: 8,
            borderRadius: 8,
            width: 145,
            justifyContent: "center",
          }}
        >
          {isDraft !== "true" && (
            <Pressable
              onPress={() => {
                setShowMenuModal(false);

                const params = {
                  id: bootCampInfo.id,
                  start_date: bootCampInfo.start_date,
                  end_date: bootCampInfo.end_date,
                  title: bootCampInfo.title,
                  start_time: bootCampInfo.start_time,
                  end_time: bootCampInfo.end_time,
                  price: bootCampInfo.price,
                  description: bootCampInfo.description,
                  cover_image: bootCampInfo.cover_image,
                  formatted_start_time: bootCampInfo.formatted_start_time,
                  formatted_end_time: bootCampInfo.formatted_end_time,
                };

                router.push({ pathname: "/edit-bootcamp", params });
              }}
            >
              <Text
                style={{
                  borderBottomColor: "#D2D2D266",
                  borderBottomWidth: 1,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}
              >
                View
              </Text>
            </Pressable>
          )}

          <Pressable
            onPress={() => {
              setShowMenuModal(false);
              setDeleteModuleModal(true);
            }}
          >
            <Text
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              Delete
            </Text>
          </Pressable>
        </View>
      </Modal>

      {/* Delete module modal */}
      <Modal isVisible={deleteModuleModal}>
        <View
          style={{
            padding: 16,
            borderRadius: 16,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              alignSelf: "flex-end",
            }}
          >
            <Pressable onPress={() => setDeleteModuleModal(false)}>
              <CircleX />
            </Pressable>
          </View>
          <View style={{ alignSelf: "center" }}>
            <ExclamationIcon />
          </View>

          <Text
            variant="normal_bold"
            style={{ textAlign: "center", paddingBottom: 4 }}
          >
            Delete module
          </Text>
          <Text style={{ textAlign: "center", paddingBottom: 24 }}>
            You are about to delete a module, are you sure you want to continue
            with this action?
          </Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <Button
              onPress={() => setDeleteModuleModal(false)}
              variant="lightPrimary"
              label="Cancel"
              width="48%"
            />
            <Button
              onPress={handleDelete}
              width="48%"
              label="Delete"
              fontFamily="AeonikMedium"
            />
          </View>
        </View>
      </Modal>

      {/* Bootcamp deleted */}
      <Modal isVisible={bootCampDeleted}>
        <View
          style={{
            padding: 16,
            borderRadius: 16,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              alignSelf: "flex-end",
            }}
          >
            <Pressable onPress={handleRoutingBack}>
              <CircleX />
            </Pressable>
          </View>
          <View style={{ alignSelf: "center" }}>
            <View style={{ alignSelf: "center" }}>
              <LottieView
                style={styles.lottie}
                source={greenTick}
                autoPlay
                loop={false}
              />
            </View>
          </View>

          <Text
            variant="normal_bold"
            style={{ textAlign: "center", paddingBottom: 16 }}
          >
            Your bootcamp training has been deleted successfully
          </Text>

          <Button
            onPress={handleRoutingBack}
            label="Dismiss"
            fontFamily="AeonikMedium"
          />
        </View>
      </Modal>
    </View>
  );
};

export default BootcampDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  lottie: {
    width: 120,
    height: 120,
  },
});
