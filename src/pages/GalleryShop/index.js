import React, { Component } from "react";

import { WebView } from "src/components";
export default class GalleryShop extends Component {
  static defaultProps = {};
  static propTypes = {};
  state = {};
  render() {
    return <WebView title="店铺图库" source={require("./html/index.html")} />;
  }
}
