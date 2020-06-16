import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black", //shadow for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 8, //android
    shadowRadius: 6,
    shadowOpacity: 0.6,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
});

export default Card;
