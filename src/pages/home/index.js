import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { connect } from "react-redux";
import TabNavigation from "src/TabNavigation";
import { addNavigationHelpers } from "react-navigation";

@connect(state => {
  const { tabNav } = state;
  return { tabNav };
})
class Home extends React.Component {
  static propTypes = {
    tabNav: PropTypes.object,
    dispatch: PropTypes.func
  };
  state = {};
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabNavigation
          navigation={{
            ...addNavigationHelpers({
              dispatch: this.props.dispatch,
              state: this.props.tabNav
            })
          }}
        />
      </View>
    );
  }
}

Home.propTypes = {
  tabNavigate: PropTypes.object,
  dispatch: PropTypes.func
};

export default Home;
