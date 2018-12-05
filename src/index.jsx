import React from "react";
import PropTypes from "prop-types";
import objectAssign from "object-assign";

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
    const { is: Component, style, innerRef, ...otherProps } = this.props;

    return (
      <Component
        tabIndex={0}
        role="button"
        style={objectAssign({}, { cursor: "pointer" }, style)}
        onKeyDown={this.onKeyDown}
        ref={innerRef}
        {...otherProps}
      />
    );
  }
}

ClickableBox.propTypes = {
  onClick: PropTypes.func.isRequired,
  is: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  style: PropTypes.shape({}),
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.object
  ])
};

ClickableBox.defaultProps = {
  is: "span",
  style: undefined,
  innerRef: undefined
};

export default React.forwardRef((props, ref) => (
  <ClickableBox innerRef={ref} {...props} />
));
