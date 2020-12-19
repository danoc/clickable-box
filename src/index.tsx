import React from "react";

interface ClickableBoxProps {
  onClick?(
    event:
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.KeyboardEvent<HTMLElement>
  ): void;
  is?: keyof JSX.IntrinsicElements | React.ElementType;
  tabIndex?: number;
  onKeyPress?(event: React.KeyboardEvent<HTMLElement>): void;
  disabled?: boolean;
  innerRef?: React.Ref<HTMLElement>;
  // Allow arbitrary props.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const ClickableBox = React.forwardRef<HTMLElement, ClickableBoxProps>(
  (props: ClickableBoxProps, ref) => {
    const {
      is: Component = "span",
      onClick,
      disabled,
      tabIndex = 0,
      // Prevent `onKeyPress` from being spread since we will call it in
      // `this.onKeyPress` and we don't want the user function to overwrite our
      // behavior.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onKeyPress,
      ...otherProps
    } = props;
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
        onKeyPress={
          !disabled
            ? (event: React.KeyboardEvent<HTMLElement>) => {
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
            : undefined
        }
        onClick={!disabled ? onClick : undefined}
        // Announce to screen readers that the `ClickableBox` is disabled.
        aria-disabled={disabled ? "true" : undefined}
        ref={ref}
        {...otherProps}
      />
    );
  }
);

// This is needed because of the `forwardRef`.
ClickableBox.displayName = "ClickableBox";

export default ClickableBox;
