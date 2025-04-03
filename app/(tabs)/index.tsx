import {StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#1B1212",
      }}
    >
      <Text
      style={{
        color:"#007AFF",
        fontSize:50,
      }}
      >
        Welcome to Workout Trainer App! </Text>
    </View>
  );
}
