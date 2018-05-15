import React from "react";
import PropTypes from "prop-types";
import { View, StatusBar, Platform, Linking } from "react-native";
import { connect } from "react-redux";
import TabNavigation from "src/TabNavigation";
import { addNavigationHelpers } from "react-navigation";

import api from "src/api";
import { version } from "src/config";
import { UpdateModal } from "src/components";

@connect(state => {
  const { tabNav, auth: { StoreId } } = state;
  return { tabNav, StoreId };
})
class Home extends React.Component {
  static propTypes = {
    tabNav: PropTypes.object,
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    StoreId: PropTypes.number
  };
  state = {
    isUpdateModalVisible: false,
    appUpdateInfo: {}
  };
  componentWillMount = async () => {
    this.getNewApp();
  };
  getNewApp() {
    api
      .getNewApp({
        VerType: Platform.select({
          ios: 2,
          android: 1
        })
      })
      .then(res => {
        const { appVersion, appUrl, appSize = 0 } = res;
        if (this.versionToNum(version) < this.versionToNum(appVersion)) {
          this.setState({
            isUpdateModalVisible: true,
            appUpdateInfo: { appVersion, appUrl, appSize }
          });
        }
      });
  }
  versionToNum(a) {
    a = a.toString();
    //也可以这样写 const c=a.split(/\./);
    const c = a.split(".");
    const num_place = ["", "0", "00", "000", "0000"],
      r = num_place.reverse();
    for (let i = 0; i < c.length; i++) {
      const len = c[i].length;
      c[i] = r[len] + c[i];
    }
    const res = c.join("");
    return res;
  }

  update = () => {
    const { appUrl } = this.state.appUpdateInfo;
    let url = "";
    if (Platform.OS !== "ios") {
      url = `itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?mt=8&onlyLatestVersion=true&pageNumber=0&sortOrdering=1&type=Purple+Software&id=${appUrl}`;
    } else {
      url = appUrl;
    }
    Linking.openURL(url);
  };
  render() {
    const { isUpdateModalVisible, appUpdateInfo } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={"transparent"}
          translucent={true}
          hidden={false}
          barStyle="light-content"
        />
        <TabNavigation
          navigation={{
            ...addNavigationHelpers({
              dispatch: this.props.dispatch,
              state: this.props.tabNav
            })
          }}
        />
        <UpdateModal
          ok={this.update}
          appUpdateInfo={appUpdateInfo}
          close={() => {
            this.setState({
              isUpdateModalVisible: false
            });
          }}
          isVisible={isUpdateModalVisible}
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
