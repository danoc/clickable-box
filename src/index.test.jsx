import React from "react";
import { cleanup, render, fireEvent } from "react-testing-library";
import ClickableBox from "./index";

afterEach(cleanup);

const validEnterPress = {
  key: "Enter",
  charCode: 13,
  which: 13
};

test("renders into document", () => {
  const children = "duckduck";

  const { getByText } = render(
    <ClickableBox onClick={() => {}}>{children}</ClickableBox>
  );

  expect(getByText(children).textContent).toBe(children);
});

describe("element type", () => {
  test("renders a `span` by default", () => {
    const { container } = render(<ClickableBox />);

    expect(container.firstChild.tagName).toBe("SPAN");
  });

  test("can be customized to render a `div`", () => {
    const { container } = render(<ClickableBox is="div" />);

    expect(container.firstChild.tagName).toBe("DIV");
  });
});

test("allows pass-through of props", () => {
  const title = "duckduck";

  const { getByTestId } = render(
    <ClickableBox data-testid="goose" title={title} />
  );

  expect(getByTestId("goose").getAttribute("title")).toBe(title);
});

test("allows `ref` prop", () => {
  const children = "duckduck";
  const ref = React.createRef();

  render(
    <ClickableBox ref={ref} onClick={() => {}}>
      {children}
    </ClickableBox>
  );

  expect(ref.current).toBeTruthy();
});

describe("merges props", () => {
  test("allows overwriting of `tabIndex`", () => {
    const children = "duckduck";

    const { getByText } = render(
      <ClickableBox tabIndex={-100} onClick={() => {}}>
        {children}
      </ClickableBox>
    );

    expect(getByText(children).getAttribute("tabIndex")).toBe("-100");
  });
});

describe("events", () => {
  test("fires event when clicked on", () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <ClickableBox onClick={handleClick}>Submit</ClickableBox>
    );

    fireEvent.click(getByText("Submit"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("fires event when enter is pressed", () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <ClickableBox onClick={handleClick}>Submit</ClickableBox>
    );

    fireEvent.keyPress(getByText("Submit"), validEnterPress);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("fires event when space is pressed", () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <ClickableBox onClick={handleClick}>Submit</ClickableBox>
    );

    fireEvent.keyPress(getByText("Submit"), {
      key: "Space",
      charCode: 32,
      which: 32
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("runs a passed in `onKeyPress` as well as `onClick` if a valid key is pressed", () => {
    const handleClick = jest.fn();
    const onKeyPress = jest.fn();

    const { getByText } = render(
      <ClickableBox onClick={handleClick} onKeyPress={onKeyPress}>
        Submit
      </ClickableBox>
    );

    fireEvent.keyPress(getByText("Submit"), validEnterPress);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(onKeyPress).toHaveBeenCalledTimes(1);
  });

  test("does not run `onClick` if a valid key is pressed, the consumer passes in their on `onKeyPress`, and the consumer's `onKeyPress` prevents the event", () => {
    const handleClick = jest.fn();
    const onKeyPress = jest.fn().mockImplementation(event => {
      event.preventDefault();
    });

    const { getByText } = render(
      <ClickableBox onClick={handleClick} onKeyPress={onKeyPress}>
        Submit
      </ClickableBox>
    );

    fireEvent.keyPress(getByText("Submit"), validEnterPress);

    expect(handleClick).toHaveBeenCalledTimes(0);
    expect(onKeyPress).toHaveBeenCalledTimes(1);
  });

  test("fires events on `keypress`, not `keydown`", () => {
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role#Required_JavaScript_Features
    const handleClick = jest.fn();

    const validKey = validEnterPress;

    const { getByText } = render(
      <ClickableBox onClick={handleClick}>Submit</ClickableBox>
    );

    const button = getByText("Submit");

    fireEvent.keyDown(button, validKey);

    expect(handleClick).toHaveBeenCalledTimes(0);

    fireEvent.keyPress(button, validKey);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not fire event when period key is pressed", () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <ClickableBox onClick={handleClick}>Submit</ClickableBox>
    );

    fireEvent.keyPress(getByText("Submit"), {
      key: ".",
      charCode: 91,
      which: 91
    });

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});

describe("disabled", () => {
  test("does not add `tabIndex`", () => {
    const children = "duckduck";

    const { getByText } = render(
      <ClickableBox disabled>{children}</ClickableBox>
    );

    expect(getByText(children).getAttribute("tabIndex")).toBe(null);
  });

  test("does not fire event when space is pressed", () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <ClickableBox onClick={handleClick} disabled>
        Submit
      </ClickableBox>
    );

    fireEvent.keyPress(getByText("Submit"), {
      key: "Space",
      charCode: 32,
      which: 32
    });

    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  test("does not fire event when clicked on", () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <ClickableBox onClick={handleClick} disabled>
        Submit
      </ClickableBox>
    );

    fireEvent.click(getByText("Submit"));
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  test("does not forward the disabled attribute", () => {
    const children = "duckduck";

    const { getByText } = render(
      <ClickableBox disabled>{children}</ClickableBox>
    );

    expect(getByText(children).getAttribute("disabled")).toBeNull();
  });

  test("does not run passed in `onKeyPress`", () => {
    const onKeyPress = jest.fn();

    const { getByText } = render(
      <ClickableBox onClick={() => {}} onKeyPress={onKeyPress} disabled>
        Submit
      </ClickableBox>
    );

    fireEvent.keyPress(getByText("Submit"), validEnterPress);

    expect(onKeyPress).toHaveBeenCalledTimes(0);
  });
});

describe("`onClick` prop is not provided", () => {
  test("does not add `tabIndex`", () => {
    const children = "duckduck";

    const { getByText } = render(<ClickableBox>{children}</ClickableBox>);

    expect(getByText(children).getAttribute("tabIndex")).toBe(null);
  });

  test("does not error when space is pressed", () => {
    const { getByText } = render(<ClickableBox>Submit</ClickableBox>);

    fireEvent.keyPress(getByText("Submit"), {
      key: "Space",
      charCode: 32,
      which: 32
    });
  });

  test("does not error event when clicked on", () => {
    const { getByText } = render(<ClickableBox>Submit</ClickableBox>);
    fireEvent.click(getByText("Submit"));
  });

  test("does not run passed in `onKeyPress`", () => {
    const onKeyPress = jest.fn();

    const { getByText } = render(
      <ClickableBox onKeyPress={onKeyPress}>Submit</ClickableBox>
    );

    fireEvent.keyPress(getByText("Submit"), validEnterPress);

    expect(onKeyPress).toHaveBeenCalledTimes(0);
  });
});
