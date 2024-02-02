import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../context/authContext';

const ChatItem = ({ sender, message, Id, fn }) => (
  <TouchableOpacity style={styles.chatItem} onPress={()=>{
    fn({username:sender, _id:Id})
  }} >
    <Text style={styles.sender}>{sender}</Text>
    <Text style={styles.message}>{message}</Text>
  </TouchableOpacity>
);

const RecentChat = () => {
  const navigation = useNavigation();


  const {auth, currentChat,setCurrentChat} = useAuth();

  const handleClick = (chat) => {
    const createChat = async () => {
      try {
        const apiUrl = 'http://192.168.0.186:8000/api/v1/chat'


        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            userId: chat._id,
          }),
        });
        if (response.ok) {
            console.log('Chat created successfully');
            const data = await response.json();

            setCurrentChat(data)
        } else {
          console.error('Error creating chat:', response.status);
        }
      } catch (error) {
        console.error('Error creating chat:', error);
      }
    }
    createChat(); 
    navigation.navigate('ChatScreen');
  }
  const [chats,setChats]  = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const apiUrl = 'http://192.168.0.186:8000/api/v1/users'
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            "content-type": 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },});
        if (response.ok) {
          const chatData = await response.json();
          setChats(chatData);
        } else {
          console.error('Error fetching chat:', response.status);
        }
      } catch (error) {
        console.error('Error fetching chat:', error);
      }
    }


    fetchChats();
  },[]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
     

      {chats.map((chat) => (
        <ChatItem key={chat._id} sender={chat.username} Id={chat._id} message={"Hello"} fn={handleClick} />
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

export default RecentChat;
