import React from "react";
import PropTypes from "prop-types";
import objectAssign from "object-assign";

class ClickableBox extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(event) {
    const { onClick } = this.props;

    switch (event.key) {
      case "Space":
        onClick();
        break;
      case "Enter":
        onClick();
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
  innerRef: undefined
};

export default React.forwardRef((props, ref) => (
  <ClickableBox innerRef={ref} {...props} />
));
