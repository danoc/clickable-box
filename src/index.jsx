import React from "react";
import PropTypes from "prop-types";
import objectAssign from "object-assign";

class ClickableBox extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(event) {
    const { onClick, onKeyPress } = this.props;

    // Run user supplied `onKeyPress` first if there is one
    if (typeof onKeyPress === "function") {
      onKeyPress(event);

      // Prevent `onClick` from running in the rare case that the user has a custom `onKeyPress`
      // that contains `event.preventDefault()`.
      if (event.isDefaultPrevented()) {
        return;
      }
    }

    switch (event.key) {
      case "Space":
        onClick(event);
        break;
      case "Enter":
        onClick(event);
        break;
      default:
        break;
    }
  }

  render() {
    const {
      is: Component,
      style,
      innerRef,
      onClick,
      disabled,
      // Prevent `onKeyPress` from being spread since we will call it in
      // `this.onKeyPress` and we don't want the user function to overwrite our
      // behavior.
      onKeyPress,
      ...otherProps
    } = this.props;

    const isActiveButton = !disabled && onClick;

    return (
      <Component
        tabIndex={isActiveButton ? 0 : undefined}
        role={isActiveButton ? "button" : undefined}
        style={
          isActiveButton
            ? objectAssign({}, { cursor: "pointer" }, style)
            : style
        }
        onKeyPress={isActiveButton ? this.onKeyPress : undefined}
        onClick={isActiveButton ? onClick : undefined}
        ref={innerRef}
        {...otherProps}
      />
    );
  }
}

ClickableBox.propTypes = {
  onClick: PropTypes.func,
  is: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  style: PropTypes.shape({}),
  disabled: PropTypes.bool,
  onKeyPress: PropTypes.func,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.object
  ])
};

ClickableBox.defaultProps = {
  onClick: undefined,
  is: "span",
  style: undefined,
  disabled: false,
  onKeyPress: undefined,
  innerRef: undefined
};

export default React.forwardRef((props, ref) => (
  <ClickableBox innerRef={ref} {...props} />
));
