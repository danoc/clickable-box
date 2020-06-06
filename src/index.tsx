import React from "react";

interface ClickableBoxProps {
  onClick?: Function;
  is?:
    | keyof JSX.IntrinsicElements
    | React.ComponentClass<any, any>
    | React.FunctionComponent<any>;
  tabIndex?: number;
  onKeyPress?(event: React.KeyboardEvent<HTMLElement>): void;
  disabled?: boolean;
  innerRef?: React.Ref<HTMLElement>;
  // Allow arbitrary props.
  [key: string]: any;
}

class ClickableBox extends React.Component<ClickableBoxProps> {
  constructor(props: ClickableBoxProps) {
    super(props);

    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(event: React.KeyboardEvent<HTMLElement>) {
    const { onClick, onKeyPress } = this.props;

    switch (event.key) {
      case " ":
      case "Spacebar": // Support FF <= 37, IE 9-11.
        // Prevent scrolling when pressing `Spacebar`.
        event.preventDefault();

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
      is: Component = "span",
      innerRef,
      onClick,
      disabled,
      tabIndex = 0,
      // Prevent `onKeyPress` from being spread since we will call it in
      // `this.onKeyPress` and we don't want the user function to overwrite our
      // behavior.
      onKeyPress,
      ...otherProps
    } = this.props;

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
        // Only fire these events if the `disabled` prop is not true.
        onKeyPress={!disabled ? this.onKeyPress : undefined}
        onClick={!disabled ? onClick : undefined}
        // Announce to screen readers that the `ClickableBox` is disabled.
        aria-disabled={disabled ? "true" : undefined}
        ref={innerRef}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      />
    );
  }
}

function forwardRef(props: ClickableBoxProps, ref?: React.Ref<HTMLElement>) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ClickableBox innerRef={ref} {...props} />;
}

forwardRef.displayName = "ClickableBox";

export default React.forwardRef(forwardRef);
