import React from "react";
import PropTypes from "prop-types";

class ClickableBox extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(event) {
    const { onClick, onKeyPress } = this.props;

    switch (event.key) {
      case " ":
        // If space is pressed and both `onKeyPress` and `onClick` exist, only
        // run `onKeyPress`.
        if (onClick && onKeyPress) {
          onKeyPress(event);
        } else if (onKeyPress) {
          onKeyPress(event);
        } else if (onClick) {
          onClick(event);
        }
        break;
      case "Enter":
        // `onKeyPress` should run first.
        if (onKeyPress) {
          onKeyPress(event);

          // Prevent `onClick` from running in the rare case that the user has
          // a custom `onKeyPress` that contains `event.preventDefault()`.
          if (event.isDefaultPrevented()) {
            return;
          }
        }
        if (onClick) onClick(event);
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
        // Don't set `tabIndex` if `disabled`. We do set it though even if
        // `onClick` is not provided so that it mimics the behavior of a native
        // `button`. We also prevent the user from passing in their own
        // `tabIndex` in the case that it is disabled. This is better than a
        // `-1` because `-1` will make the element focusable but not reachable
        // via keyboard navigation.
        tabIndex={!disabled ? tabIndex : undefined}
        // Always have `role="button"`, even if it is disabled. Combined with
        // `aria-disabled`, screen readers will announce this the same as
        // a native `button` element.
        role="button"
        onKeyPress={!disabled ? this.onKeyPress : undefined}
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
