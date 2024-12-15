import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Modal from "react-native-modal";

import {
  CircleX,
  ExclamationIcon,
  OptionsIcon,
  PencilIcon,
  TrashIcon,
} from "~/assets/icons";
import { course } from "~/assets/images";
import { getTutorSingeBootCamp } from "~/src/api/tutor-bootcamps";
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

  let { id } = useLocalSearchParams();
  if (Array.isArray(id)) {
    id = id[0]; // Ensure it's a string
  }

  if (!id || typeof id !== "string") {
    console.error("Invalid id parameter");
  }

  useEffect(() => {
    setLoading(true);
    const fetchBootCamp = async () => {
      try {
        const res = await getTutorSingeBootCamp(accessToken, id);
        setLoading(false);
        setBootcampInfo(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchBootCamp();
  }, [id]);

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
            source={{ uri: bootCampInfo?.cover_image }}
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
              {bootCampInfo?.start_and_end_date}
            </Text>
          </Text>
          <Text style={{ fontSize: 16 }}>
            Time:{" "}
            <Text variant="subtitle" style={{ color: "#1D1D1D" }}>
              {bootCampInfo?.formatted_start_time} to{" "}
              {bootCampInfo?.formatted_end_time}
            </Text>
          </Text>

          <Text variant="normal_bold" style={{ fontSize: 20 }}>
            #{bootCampInfo?.price}
          </Text>
        </View>

        <View
          style={{
            marginTop: 24,
          }}
        >
          <Text
            variant="subtitle"
            style={{ color: "#1D1D1D", marginBottom: 8 }}
          >
            Participants
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* Column 1 */}
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
                  LEARNERS NAME
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#D2D2D266",
                  }}
                >
                  John Doe
                </Text>
                <Text
                  style={{
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#D2D2D266",
                  }}
                >
                  John Doe
                </Text>
                <Text
                  style={{
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#D2D2D266",
                  }}
                >
                  John Doe
                </Text>
              </View>
            </View>

            {/* Column 2 */}
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
              <View>
                <Text
                  style={{
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#D2D2D266",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  jo.parker@gmail.com
                </Text>
                <Text
                  style={{
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#D2D2D266",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  jo.parker@gmail.com
                </Text>
                <Text
                  style={{
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#D2D2D266",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  jo.parker@gmail.com
                </Text>
              </View>
            </View>
          </View>
        </View>
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
          <Pressable
            onPress={() => {
              setShowMenuModal(false);
              router.push({
                pathname: "/edit-bootcamp",
                params: {
                  start_date: bootCampInfo.start_date,
                  end_date: bootCampInfo.end_date,
                  title: bootCampInfo.title,
                  start_time: bootCampInfo.start_time,
                  end_time: bootCampInfo.end_time,
                  price: bootCampInfo.price,
                  description: bootCampInfo.description,
                  cover_image: bootCampInfo.cover_image,
                },
              });
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
          <Pressable
            onPress={() => {
              setShowMenuModal(false);
              router.push("/edit-course");
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
            marginTop: "25%",
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
            <Button variant="lightPrimary" label="Cancel" width="48%" />
            <Button width="48%" label="Delete" fontFamily="AeonikMedium" />
          </View>
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
});
