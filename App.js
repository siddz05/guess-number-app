import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  ThemeProvider,
  Button,
  Avatar,
  Icon,
  Badge,
  ListItem,
} from "react-native-elements";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

//const RaisedButton = (props) => <Button raised {...props} />;

const list = [
  {
    title: "Appointments",
    icon: "av-timer",
  },
  {
    title: "Trips",
    icon: "flight-takeoff",
  },
];

const theme = {
  marginTop: 10,
  Button: {
    raised: true,
  },
};

export default function App() {
  [userNumber, setUserNumber] = useState();
  [roundNumber, setRoundNumber] = useState(0);

  const configureNewGamehandler = () => {
    setRoundNumber(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setRoundNumber(0);
  };

  const gameOverHandler = (numberOfRound) => {
    setRoundNumber(numberOfRound);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && roundNumber <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (roundNumber > 0) {
    content = (
      <GameOverScreen
        userNumber={userNumber}
        rounds={roundNumber}
        onRestart={configureNewGamehandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess A Number"></Header>
      {content}
    </View>
  );
  // return (
  //   <ThemeProvider theme={theme}>
  //     <Header
  //       leftComponent={{ icon: "menu", color: "#fff" }}
  //       centerComponent={{ text: "Games And Number", style: { color: "#fff" } }}
  //       rightComponent={{ icon: "home", color: "#fff" }}
  //     />
  //     <Header
  //       statusBarProps={{ barStyle: "light-content" }}
  //       barStyle="light-content" // or directly
  //       // leftComponent={<MyCustomLeftComponent />}
  //       centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
  //       containerStyle={{
  //         backgroundColor: "#3D6DCC",
  //         justifyContent: "space-around",
  //       }}
  //     />
  //     <Icon name="rowing" />

  //     <Icon name="g-translate" color="#00aced" />

  //     <Icon
  //       name="sc-telegram"
  //       type="evilicon"
  //       color="#517fa4"
  //       reverse={true}
  //       solid={true}
  //     />

  //     <Badge value="99+" status="error" />
  //     <Badge value={<Text>My Custom Badge</Text>} />

  //     <Avatar
  //       rounded
  //       source={{
  //         uri:
  //           "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
  //       }}
  //     />
  //     <Button title="My Button" />
  //     <Button title="My 2nd Button" />

  //     <View>
  //       {list.map((item, i) => (
  //         <ListItem
  //           key={i}
  //           title={item.title}
  //           leftIcon={{ name: item.icon }}
  //           bottomDivider
  //           chevron
  //         />
  //       ))}
  //     </View>
  //   </ThemeProvider>
  // );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  screen: {
    flex: 1,
  },
});
