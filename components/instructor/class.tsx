import LottieView from "lottie-react-native";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

import { greenTick } from "~/assets/animations";
import {
  CircleX,
  ExclamationIcon,
  SimplePencilIcon,
  TrashIcon,
  UIUX,
} from "~/assets/icons";
import { Button } from "~/src/ui";
import { Text } from "~/theme";

type Props = object;

const Class = (props: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalForEditVisible, setModalForEditVisible] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        borderColor: "#D2D2D266",
        borderWidth: 1,
        padding: 16,
        marginBottom: 16,
        borderRadius: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          marginBottom: 16,
          flex: 1,
          position: "relative",
        }}
      >
        <View
          style={{
            backgroundColor: "#F5F5F5",
            padding: 12,
            borderRadius: 9999,
          }}
        >
          <UIUX />
        </View>
        <View>
          <Text style={{ color: "#686868", paddingBottom: 4 }}>
            10:00am - 12:00pm
          </Text>
          <Text variant="subtitle">Introduction to UI/UX design</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            flex: 1,
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <Pressable onPress={() => setModalForEditVisible(true)}>
            <SimplePencilIcon />
          </Pressable>
          <Pressable onPress={() => setModalVisible(true)}>
            <TrashIcon color="#000000" />
          </Pressable>
        </View>
      </View>
      <Pressable
        style={{
          backgroundColor: "#CDD7D8",
          padding: 8,
          borderRadius: 12,
        }}
      >
        <Text style={{ textAlign: "center", fontFamily: "AeonikBold" }}>
          Start class
        </Text>
      </Pressable>

      {/* Modals for class delete */}
      <Modal isVisible={isModalVisible}>
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
            <Pressable onPress={() => setModalVisible(false)}>
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
            Delete scheduled class
          </Text>
          <Text style={{ textAlign: "center", paddingBottom: 24 }}>
            You are about to delete this scheduled class, are you sure you want
            to continue with this action?
          </Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <Button variant="lightPrimary" label="Cancel" width="48%" />
            <Button width="48%" label="Delete" fontFamily="AeonikMedium" />
          </View>
        </View>
      </Modal>

      {/* Modals for class edit */}
      <Modal isVisible={isModalForEditVisible}>
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
            <Pressable onPress={() => setModalForEditVisible(false)}>
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
            Delete scheduled class
          </Text>
          <Text style={{ textAlign: "center", paddingBottom: 24 }}>
            You are about to delete this scheduled class, are you sure you want
            to continue with this action?
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

export default Class;

const styles = StyleSheet.create({
  lottie: {
    width: 120,
    height: 120,
  },
});
