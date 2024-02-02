import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { useAuth } from "../context/authContext";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { auth, currentChat, shouldUpdate, setShoulUpdate } = useAuth();


 

  useEffect(() =>   {

    const fetchMessages = async () => {
      const res = await fetch(`http://192.168.0.186:8000/api/v1/messages/${currentChat?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if(res.ok){
        const data = await res.json();
        setMessages(data)
      }
    }
    currentChat && fetchMessages()
  },[shouldUpdate])


  


  const handleSendMessage = async () => {
    if (message.trim() === "") {
      // Don't send empty messages
      return;
    }

    try {
      const res = await fetch("http://192.168.0.186:8000/api/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          chatId: currentChat._id,
          content: message
        }),
      });

      if(res.status === 201){
        const data = await res.json();
        setShoulUpdate((prev) => !prev)
        console.log("Message sent successfully");
      } else {
        console.error('Error creating chat:', res.status);
      }
    } catch (error) {
      console.error('Error creating chat:', error);
    }

    setMessage("");
    console.log(messages)
  };

    

  const renderMessage = ( {item} ) => (
    <View
      style={item.sender?.email === auth?.user?.email ? styles.myMessage : styles.friendMessage}
    >
      <Text style={styles.messageText}>{item?.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {currentChat && currentChat.chatName}
        </Text>
      </View>

      {/* Chat messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderMessage}
        style={styles.chatContainer}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.messageInputContainer}
      >
        <TextInput
          style={styles.messageInput}
          placeholder="Type your message..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db", 
  },
  headerText: {
    fontSize: 20,
    color: "white",
  },
  chatContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ecf0f1", 
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "green", 
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "70%",
  },
  friendMessage: {
    alignSelf: "flex-start",
    backgroundColor: "blue", 
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "70%",
  },
  messageText: {
    color: "white", 
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#bdc3c7", 
  },
  messageInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: "#3498db", 
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ChatScreen;
