import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { onboardingBg } from "~/assets/images";

type Props = {
  text: string;
};

const OnBoarding = (props: Props) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Image src={onboardingBg} /> */}
      <Image source={onboardingBg} style={{ width: "auto", height: 509 }} />
      <View style={styles.buttonsContainer}>
        <View>
          <Text
            style={[styles.centeredText, { paddingBottom: 8, paddingTop: 32 }]}
          >
            Welcome to Xheta
          </Text>
          <Text style={[styles.centeredText]}>
            Kindly select the account type you will like to create
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "#D2D2D266",
              borderRadius: 8,
              padding: 16,
              marginTop: 24,
              marginBottom: 16,
            }}
          >
            <View>
              <Text>Learner</Text>
              <Text>hello</Text>
            </View>
            <Checkbox value={isChecked} onValueChange={setChecked} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "#D2D2D266",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <View>
              <Text>Learner</Text>
              <Text>hello</Text>
            </View>
            <Checkbox value={isChecked} onValueChange={setChecked} />
          </View>
          <View>
            <Pressable>
              <Text>Proceed</Text>
            </Pressable>
          </View>
        </View>
        <View />
      </View>
    </SafeAreaView>
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
