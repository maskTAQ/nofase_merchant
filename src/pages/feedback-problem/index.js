import React, { Component } from "react";

import { WebView } from "src/components";
export default class FeedbackProblem extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {};
  render() {
    return <WebView title="问题反馈" source={require("./html/index.html")} />;
  }
}
