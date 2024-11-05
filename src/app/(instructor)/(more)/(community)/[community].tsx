import React, { useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { ImageIcon, SendIcon } from "~/assets/icons";
import { ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

interface MessageItem {
  id: string;
  text: string;
  sender: string;
}

const DynamicCommunity = () => {
  const [messages, setMessages] = useState<MessageItem[]>([
    { id: "1", text: "Hey! How are you?", sender: "other" },
    { id: "2", text: "I'm good! How about you?", sender: "me" },
  ]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: "me",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText("");
    }
  };

  const renderItem = ({ item }: { item: MessageItem }) => (
    <View
      style={[
        styles.messageRow,
        item.sender === "me" ? styles.myMessageRow : styles.otherMessageRow,
      ]}
    >
      {item.sender === "other" && <View style={styles.avatar} />}
      <View style={styles.messageContent}>
        <Text
          variant="sm"
          style={[
            styles.senderName,
            item.sender === "me" ? styles.mySenderName : styles.otherSenderName,
          ]}
        >
          {item.sender === "me" ? "You" : "John"}
        </Text>
        <View
          style={[
            styles.messageContainer,
            item.sender === "me" ? styles.myMessage : styles.otherMessage,
          ]}
        >
          <Text
            style={
              item.sender === "me"
                ? styles.myMessageText
                : styles.otherMessageText
            }
          >
            {item.text}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScreenHeader bg title="Community" />

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />

      <View style={styles.inputContainer}>
        <View
          style={{
            borderRightWidth: 1,
            borderColor: theme.colors.borderColor,
            paddingRight: 16,
            paddingLeft: 6,
          }}
        >
          <ImageIcon />
        </View>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Write a message here"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <SendIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    padding: 16,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 5,
  },
  myMessageRow: {
    justifyContent: "flex-end",
  },
  otherMessageRow: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: "red",
    borderRadius: 20,
    marginRight: 10,
  },
  messageContent: {
    maxWidth: "70%",
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  mySenderName: {
    alignSelf: "flex-end", // Aligns "You" to the right
    textAlign: "right", // Ensures text aligns right within the container
  },
  otherSenderName: {
    alignSelf: "flex-start",
    textAlign: "left",
  },
  messageContainer: {
    padding: 10,
    borderRadius: 12,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: 12,
  },
  otherMessage: {
    alignSelf: "flex-start",
    borderColor: theme.colors.borderColor,
    borderWidth: 1,
    borderTopRightRadius: 12,
  },
  myMessageText: {
    fontSize: 16,
    color: "white",
  },
  otherMessageText: {
    fontSize: 16,
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    height: 40,
  },
  sendButton: {
    marginRight: 6,
    backgroundColor: "#E7F2F3",
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 8,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DynamicCommunity;
