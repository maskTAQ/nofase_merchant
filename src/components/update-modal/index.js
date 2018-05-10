import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import { Alert, Icon, Button } from "../index";

const UpdateModal = ({ close, isVisible, version, fileSize, ok }) => {
  const styles = {
    container: {
      padding: 10,
      borderWidth: 1,
      borderColor: "#1a98e0",
      borderRadius: 6,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff"
    },
    version: {
      lineHeight: 30,
      color: "#737373"
    },
    fileSize: {
      lineHeight: 30,
      color: "#737373"
    },
    buttonGroup: {
      width: "100%",
      paddingLeft: 20,
      paddingRight: 20,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    button: {
      width: 110,
      height: 35,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#1a98e0",
      backgroundColor: "#1a98e0"
    },
    buttonText: {
      fontSize: 14,
      color: "#fff"
    },
    cancelButtonText: {
      fontSize: 14,
      color: "#1a98e0"
    }
  };
  return (
    <Alert isVisible={isVisible} close={close}>
      <View style={styles.container}>
        <Icon size={45} source={require("./img/hint.png")} />
        <Text style={styles.version}>软件版本: {version}</Text>
        <Text style={styles.fileSize}>文件大小:{fileSize}</Text>
        <View style={styles.buttonGroup}>
          <Button
            onPress={ok}
            style={styles.button}
            textStyle={styles.buttonText}
          >
            升级
          </Button>
          <Button
            onPress={close}
            style={[styles.button, { backgroundColor: "#fff" }]}
            textStyle={styles.cancelButtonText}
          >
            稍后再说
          </Button>
        </View>
      </View>
    </Alert>
  );
};
UpdateModal.propTypes = {
  close: PropTypes.func,
  ok: PropTypes.func,
  version: PropTypes.any,
  fileSize: PropTypes.string,
  isVisible: PropTypes.bool
};

export default connect()(UpdateModal);
