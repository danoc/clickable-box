import React from "react";
import PropTypes from "prop-types";

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
      case " ":
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
      tabIndex,
      // Prevent `onKeyPress` from being spread since we will call it in
      // `this.onKeyPress` and we don't want the user function to overwrite our
      // behavior.
      onKeyPress,
      ...otherProps
    } = this.props;

    const isActiveButton = !disabled && !!onClick;

    return (
      <Component
        tabIndex={isActiveButton ? tabIndex : -1}
        role={isActiveButton ? "button" : undefined}
        onKeyPress={isActiveButton ? this.onKeyPress : undefined}
        onClick={isActiveButton ? onClick : undefined}
        aria-disabled={!isActiveButton}
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
  tabIndex: PropTypes.number,
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
  tabIndex: 0,
  disabled: false,
  onKeyPress: undefined,
  innerRef: undefined
};

export default React.forwardRef((props, ref) => (
  <ClickableBox innerRef={ref} {...props} />
));
