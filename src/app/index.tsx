import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { Dispatch, SetStateAction, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import { Button } from "../ui/button";

import { onboardingBg } from "~/assets/images";
import { Text } from "~/theme";

type Props = {
  text: string;
};

const CheckBox = ({
  isChecked,
  setChecked,
  header,
  text,
  mb,
}: {
  isChecked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  header: string;
  text: string;
  mb?: boolean;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#D2D2D266",
        borderRadius: 8,
        padding: 16,
        marginBottom: mb ? 16 : 0,
      }}
    >
      <View>
        <Text style={{ paddingBottom: 2 }} variant="subtitle">
          {header}
        </Text>
        <Text style={{ height: 18 }}>{text}</Text>
      </View>
      <Checkbox value={isChecked} onValueChange={setChecked} />
    </View>
  );
};

const OnBoarding = (props: Props) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <>
      <Image source={onboardingBg} style={{ width: "auto", height: 509 }} />

      <View style={styles.buttonsContainer}>
        <View>
          <Text
            variant="title"
            style={[styles.centeredText, { paddingBottom: 8, paddingTop: 32 }]}
          >
            Welcome to Xheta
          </Text>
          <Text
            variant="body"
            style={[styles.centeredText, { paddingBottom: 24 }]}
          >
            Kindly select the account type you will like to create
          </Text>
          <CheckBox
            isChecked={isChecked}
            setChecked={setChecked}
            header="Learner"
            text="Seeking to learn from others"
            mb
          />
          <CheckBox
            isChecked={isChecked}
            setChecked={setChecked}
            header="Instructor"
            text="Seeking to tutor others "
          />

          <View style={{ marginTop: 24 }}>
            <Button onPress={() => router.push("/signup")} label="Proceed" />
          </View>
        </View>
        <View />
      </View>
    </>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  buttonsContainer: {
    borderRadius: 32,
    marginTop: -90,
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 16,
  },
  centeredText: {
    textAlign: "center",
  },
});
