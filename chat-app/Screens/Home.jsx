import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const ChatItem = ({ sender, message }) => (
  <View style={styles.chatItem}>
    <Text style={styles.sender}>{sender}</Text>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const Home = () => {
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {chats.map((chat) => (
        <ChatItem key={chat.id} sender={chat.sender} message={chat.message} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 16,
  },
  chatItem: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sender: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
  },
});

export default Home;
