import * as React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";
import { MapView } from "expo";
import * as Permissions from "expo-permissions";

export default class App extends React.Component {
  state = {
    latitude: null,
    longitude: null,
  };
  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status !== "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
      console.log("here");
    }
    Location.getCurrentPositionAsync(
      ({ coords: { latitude, longitude } }) =>
        this.setState({ latitude, longitude }, () =>
          console.log("State: ", this.state)
        ),
      (error) => console.log("Error:", error)
    );
  }

  render() {
    const { latitude, longitude } = this.state;
    if (latitude) {
      return (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            // latitude,
            // longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        ></MapView>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>We need your permission</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
