import React from "react";
import PropTypes from "prop-types";

class ClickableBox extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(event) {
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
    const { is, innerRef, ...otherProps } = this.props;

    return React.createElement(
      is,
      Object.assign(
        {},
        {
          tabIndex: 0,
          role: "button",
          style: { cursor: "pointer" },
          onKeyDown: this.onKeyDown,
          ref: innerRef
        },
        otherProps
      )
    );
  }
}

ClickableBox.propTypes = {
  onClick: PropTypes.func.isRequired,
  is: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.object
  ])
};

ClickableBox.defaultProps = {
  is: "div",
  innerRef: undefined
};

export default React.forwardRef((props, ref) => (
  <ClickableBox innerRef={ref} {...props} />
));
