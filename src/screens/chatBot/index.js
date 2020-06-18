import React, { Component } from "react";
import { ScrollView } from "react-native";
import ChatBot from "../../components/chatBot";
import ChatFile from "./chatbot.json";
import kiiraLogo from "../../../assets/logo.png";
import styles from "./style";

class ChatBotView extends Component {
  render() {
    return (
      <ScrollView>
        <ChatBot
          ref="ChatBot"
          ChatBotID="Kiira Intake"
          questions={ChatFile.chatone}
          chatHeader={"Welcome to Kiira"}
          cpuIcon={kiiraLogo}
        />
      </ScrollView>
    );
  }
}

export default ChatBotView;
