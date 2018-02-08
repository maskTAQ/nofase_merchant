import React from "react";
import { Text, View } from "react-native";
import { TabNavigator } from "react-navigation";

class HomeScreen extends React.Component {
  state = {};
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  state = {};
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}
const styles = {
  tabBar: {
    height: 40,
    backgroundColor: "red"
  }
};
export default TabNavigator(
  {
    Home: { screen: HomeScreen },
    Settings: { screen: SettingsScreen }
  },
  {
    tabBarComponent(p) {
      const { routes } = p.navigationState;
      return (
        <View style={styles.tabBar}>
          {routes.map(({ routeName }) => (
            <Text key={routeName}>{routeName}</Text>
          ))}
        </View>
      );
    }
  }
);
