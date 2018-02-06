import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import PropTypes from "prop-types";

const renderChildren = (children, textStyle) => {
  const childrenType = typeof children;
  if (childrenType === "object") {
    return children;
  }
  return <Text style={textStyle}>{children}</Text>;
};
const Button = ({ children, style, onPress, textStyle, disabled }) => {
  if (disabled) {
    return <View style={style}>{renderChildren(children, textStyle)}</View>;
  }
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {renderChildren(children, textStyle)}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.any,
  onPress: PropTypes.func,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabled: PropTypes.bool
};

export default Button;
