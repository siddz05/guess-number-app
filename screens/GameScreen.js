import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateBetweenMinAndMax = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const random1 = Math.floor(Math.random() * (max - min)) + min;
  return random1;
  if (random1 === exclude) {
    return generateBetweenMinAndMax(min, max, exclude);
  } else {
    return random1;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateBetweenMinAndMax(1, 100, props.userChoice)
  );

  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess == userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessNumber = (direction) => {
    if (
      (direction == "lower" && currentGuess < props.userChoice) ||
      (direction == "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "This is Wrong!", [
        { text: "Sorry", style: "cancel" },
      ]);
    }

    if (direction == "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateBetweenMinAndMax(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds((curRound) => curRound + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Number: </Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="LOWER"
            onPress={nextGuessNumber.bind(this, "lower")}
          ></Button>
        </View>
        <View style={styles.button}>
          <Button
            title="GREATER"
            onPress={nextGuessNumber.bind(this, "greater")}
          ></Button>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    width: 90,
  },
});

export default GameScreen;
