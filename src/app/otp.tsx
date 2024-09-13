import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import type { RefObject } from "react";
import type { TextInput } from "react-native";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { OTPInput } from "../ui/form";

export default function PhoneVerificationScreen() {
  const [codes, setCodes] = useState<string[] | undefined>(Array(6).fill(""));
  const refs: RefObject<TextInput>[] = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const [errorMessages, setErrorMessages] = useState<string[]>();
  const router = useRouter();

  const config = {
    backgroundColor: "green",
    textColor: "white",
    borderColor: "red",
    errorColor: "blue",
    focusColor: "yellow",
  };

  const onChangeCode = (text: string, index: number) => {
    if (text.length > 1) {
      setErrorMessages(undefined);
      const newCodes = text.split("");
      setCodes(newCodes);
      refs[5]!.current?.focus();
      return;
    }
    setErrorMessages(undefined);
    const newCodes = [...codes!];
    newCodes[index] = text;
    setCodes(newCodes);
    if (text !== "" && index < 5) {
      refs[index + 1]!.current?.focus();
    }
  };

  return (
    <View>
      <OTPInput
        codes={codes!}
        errorMessages={errorMessages}
        onChangeCode={onChangeCode}
        refs={refs}
        config={config}
      />
    </View>
  );
}
