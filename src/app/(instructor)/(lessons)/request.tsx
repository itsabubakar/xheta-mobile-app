import { format } from "date-fns";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { DatePicker, Lesson } from "~/components";
import { Text } from "~/theme";

type Props = object;

const Request = (props: Props) => {
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(todayDate);
  return (
    <View>
      <Text style={{ marginTop: 24, marginBottom: 8 }} variant="md">
        Lesson request
      </Text>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Lesson />
      <Lesson />
      <Lesson />
      <Lesson />
      <Lesson />
      <Lesson />
      <Lesson />
    </View>
  );
};

export default Request;

const styles = StyleSheet.create({});
