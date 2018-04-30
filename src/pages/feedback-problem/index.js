import React, { Component } from "react";
import { WebView } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Page } from "src/components";

@connect(state => {
  const { storeInfo: { Id } } = state;
  return { Id };
})
export default class FeedbackProblem extends Component {
  static defaultProps = {};
  static propTypes = {
    Id: PropTypes.number
  };
  state = {};
  render() {
    const { Id } = this.props;
    return (
      <Page title="问题反馈">
        <WebView
          source={{
            uri: `https://vmslq.cn/webview/feedback/index.html?OpinionType=2&StoreId=${Id}`
          }}
        />
      </Page>
    );
  }
}
