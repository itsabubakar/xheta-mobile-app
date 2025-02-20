import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";

import { ImageIcon, SendIcon } from "~/assets/icons";
import { getCommunityMessages } from "~/src/api/communities";
import { useAuthStore } from "~/src/core/storage";
import { ScreenHeader } from "~/src/ui";
import { Text, theme } from "~/theme";

interface MessageItem {
  id: number;
  text: string;
  sender: string;
  sender_id: number;
  created_at: string;
  sender_profile_image: string;
  has_file: boolean;
  file?: string | null;
}

const DynamicCommunity = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputText, setInputText] = useState("");

  const authData = useAuthStore((state) => state.authData);
  const accessToken = authData?.access_token || "";
  const currentUserId = authData?.user?.id || 0; // Assuming `authData.user.id` holds the current user's ID
  const { community }: any = useLocalSearchParams();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getCommunityMessages(accessToken, community);
      if (res?.data) {
        const formattedMessages = res.data.map((msg: any) => ({
          id: msg.id,
          text: msg.content,
          sender: msg.sender,
          sender_id: msg.sender_id,
          created_at: msg.created_at,
          sender_profile_image: msg.sender_profile_image,
          has_file: msg.has_file,
          file: msg.file || null,
        }));
        setMessages(formattedMessages);
      }
    } catch (error: any) {
      console.error("Error fetching messages:", error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: MessageItem = {
        id: Date.now(),
        text: inputText,
        sender: "You",
        sender_id: currentUserId,
        created_at: new Date().toLocaleString(),
        sender_profile_image: "", // Assuming no profile image for the current user
        has_file: false,
        file: null,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText("");
    }
  };

  const renderItem = ({ item }: { item: MessageItem }) => {
    const isCurrentUser = item.sender_id === currentUserId;

    return (
      <View
        style={[
          styles.messageRow,
          isCurrentUser ? styles.myMessageRow : styles.otherMessageRow,
        ]}
      >
        {!isCurrentUser && (
          <Image
            source={{ uri: item.sender_profile_image }}
            style={styles.avatar}
          />
        )}
        <View style={styles.messageContent}>
          <Text
            variant="sm"
            style={[
              styles.senderName,
              isCurrentUser ? styles.mySenderName : styles.otherSenderName,
            ]}
          >
            {isCurrentUser ? "You" : item.sender}
          </Text>
          <View
            style={[
              styles.messageContainer,
              isCurrentUser ? styles.myMessage : styles.otherMessage,
            ]}
          >
            <Text
              style={
                isCurrentUser ? styles.myMessageText : styles.otherMessageText
              }
            >
              {item.text}
            </Text>
            {item.has_file && item.file && (
              <Image
                source={{ uri: item.file }}
                style={styles.messageImage}
                resizeMode="cover"
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader bg title="Community" />

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.chatContainer}
      />

      <View style={styles.inputContainer}>
        <View style={styles.imageIconContainer}>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    alignSelf: "flex-end",
  },
  otherMessageRow: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#ddd",
  },
  messageContent: {
    maxWidth: "70%",
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  mySenderName: {
    alignSelf: "flex-end",
    textAlign: "right",
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
  messageImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  imageIconContainer: {
    borderRightWidth: 1,
    borderColor: theme.colors.borderColor,
    paddingRight: 16,
    paddingLeft: 6,
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
