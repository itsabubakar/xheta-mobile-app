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
import { certificate } from "~/assets/images";
import { singleCourseDetail } from "~/src/api/tutors-courses";
import { useAuthStore } from "~/src/core/storage";
import { Button, ScreenHeaderWithCustomIcon } from "~/src/ui";
import { Text, theme } from "~/theme";

type Props = object;

const CourseDetails = (props: Props) => {
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [deleteModuleModal, setDeleteModuleModal] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token || "";
  const { id } = useLocalSearchParams();
  const [courseData, setCourseData] = useState<any>();

  console.log(id);
  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const res = await singleCourseDetail(accessToken, id as string);
      setCourseData(res.data);
      console.log(res);
    } catch (error: any) {
      console.error("Failed to fetch course:", error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  console.log(courseData);

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
        title="Course details"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: courseData?.course_image }}
          />
        </View>
        <View style={{ marginTop: 16, gap: 4 }}>
          <Text variant="subtitle">{courseData?.course_name}</Text>
          <Text>{courseData?.course_description}</Text>
        </View>
        <View style={{ marginTop: 8, gap: 6 }}>
          <Text style={{ fontSize: 16 }}>
            Language of instruction:{" "}
            <Text style={{ color: "#1D1D1D" }}>
              {courseData?.language_of_instruction}
            </Text>
          </Text>
          <Text style={{ fontSize: 16 }}>
            Certificate:{" "}
            <Text variant="subtitle" style={{ color: "#1D1D1D" }}>
              Yes
            </Text>
          </Text>
          <Text style={{ fontSize: 16 }}>
            Instructor:{" "}
            <Text variant="subtitle" style={{ color: "#1D1D1D" }}>
              {authData?.name}
            </Text>
          </Text>
          <Text style={{ fontSize: 16 }}>
            Course duration:{" "}
            <Text variant="subtitle" style={{ color: "#1D1D1D" }}>
              {courseData?.course_duration}
            </Text>
          </Text>
          <Text variant="normal_bold" style={{ fontSize: 20 }}>
            #{courseData?.course_price}
          </Text>
        </View>

        {courseData?.course_lessons
          ?.sort(
            (a: { lesson_number: string }, b: { lesson_number: string }) =>
              parseInt(a.lesson_number.replace("Lesson ", "")) -
              parseInt(b.lesson_number.replace("Lesson ", "")),
          )
          .map((lesson: any) => (
            <View
              key={lesson.id}
              style={{
                marginTop: 24,
              }}
            >
              <Text
                variant="subtitle"
                style={{ color: "#1D1D1D", marginBottom: 8 }}
              >
                {lesson.lesson_number}
              </Text>
              {lesson.course_modules.map((module: any) => (
                <View
                  key={module.id}
                  style={{
                    marginTop: 8,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomColor: "#D2D2D266",
                    borderBottomWidth: 1,
                    paddingBottom: 8,
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text variant="md">{module.module_title}</Text>
                    <Text style={{ flex: 1 }}>{module.module_sub_title}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 24,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        setShowMenuModal(false);

                        const params = {
                          id: courseData.id,
                          courseName: courseData.course_name,
                          coursePrice: courseData.course_price,
                          courseImage: courseData.course_image,
                          courseDescription: courseData.course_description,
                          courseDuration: courseData.course_duration,
                          courseIntroVideo: courseData.course_intro_video,
                        };
                        console.log(params);
                        router.push({ pathname: "/edit-course", params });
                      }}
                    >
                      <PencilIcon />
                    </Pressable>
                    <Pressable onPress={() => setDeleteModuleModal(true)}>
                      <TrashIcon color="#000000" />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          ))}
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
          <Pressable
            onPress={() => {
              setShowMenuModal(false);

              const params = {
                id: courseData.id,
                courseName: courseData.course_name,
                coursePrice: courseData.course_price,
                courseImage: courseData.course_image,
                courseDescription: courseData.course_description,
                courseDuration: courseData.course_duration,
                courseIntroVideo: courseData.course_intro_video,
                certificate: courseData.course_certificate,
                courseLevel: courseData.course_level,
              };
              router.push({ pathname: "/edit-course", params });
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
              Edit Course
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setShowMenuModal(false);
              router.push("/add-modules");
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
              Add module
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setShowMenuModal(false);
              router.push("/add-assignment");
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
              Add assignment
            </Text>
          </Pressable>
          <Text
            style={{
              borderBottomColor: "#D2D2D266",
              borderBottomWidth: 1,
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            Un-publish
          </Text>
          <Text
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            Delete
          </Text>
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

export default CourseDetails;

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
