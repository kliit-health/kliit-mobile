import React from "react";
import ChatBot from "../../components/chatBot";
import Review from "./review";

const ChatBotScreen = () => {
  return (
    <ChatBot
      handleEnd={(a, b, c) => {
        console.log("A: ", a);
        console.log("B: ", b);
        console.log("C: ", c);
      }}
      steps={[
        {
          id: "intro",
          message:
            "Hi, i'm Kiira, your personal health assistant. I'm here to help you navigate your health. \n \n Let's get to know each other shall we?",
          trigger: "1",
          color: "green",
        },
        {
          id: "1",
          message: "What is your first name?",
          trigger: "first_name",
        },
        {
          id: "first_name",
          user: true,
          trigger: "3",
        },
        {
          id: "3",
          message: "What is your last name?",
          trigger: "last_name",
        },
        {
          id: "last_name",
          user: true,
          trigger: "5",
        },
        {
          id: "5",
          message: "What is your gender?",
          trigger: "gender",
        },
        {
          id: "gender",
          user: true,
          trigger: "7",
        },
        {
          id: "7",
          message: "How old are you?",
          trigger: "age",
        },
        {
          id: "age",
          user: true,
          trigger: "9",
          validator: (value) => {
            if (isNaN(value)) {
              return "value must be a number";
            } else if (value < 0) {
              return "value must be positive";
            } else if (value > 120) {
              return `${value}? Come on!`;
            }

            return true;
          },
        },
        {
          id: "9",
          message: "Great! Check out your summary",
          trigger: "review",
        },
        {
          id: "review",
          component: <Review />,
          trigger: "update",
        },
        {
          id: "update",
          message: "Would you like to update some field?",
          trigger: "update-question",
        },
        {
          id: "update-question",
          options: [
            { value: "yes", label: "Yes", trigger: "update-yes" },
            { value: "no", label: "No", trigger: "end-message" },
          ],
        },
        {
          id: "update-yes",
          message: "What field would you like to update?",
          trigger: "update-fields",
        },
        {
          id: "update-fields",
          options: [
            {
              value: "first_name",
              label: "First Name",
              trigger: "update-first-name",
            },
            {
              value: "last_name",
              label: "Last Name",
              trigger: "update-last-name",
            },
            { value: "gender", label: "Gender", trigger: "update-gender" },
            { value: "age", label: "Age", trigger: "update-age" },
          ],
        },
        {
          id: "update-first-name",
          update: "first_name",
          trigger: "9",
        },
        {
          id: "update-last-name",
          update: "first_name",
          trigger: "9",
        },
        {
          id: "update-gender",
          update: "gender",
          trigger: "9",
        },
        {
          id: "update-age",
          update: "age",
          trigger: "9",
        },
        {
          id: "end-message",
          message: "Thanks! Your data was submitted successfully!",
          end: true,
        },
      ]}
    />
  );
};

export default ChatBotScreen;
