import React from "react";
import { cleanup, render, fireEvent } from "react-testing-library";
import Unbutton from "./index";

afterEach(cleanup);

test("renders into document", () => {
  const children = "duckduck";

  const { getByText } = render(
    <Unbutton onClick={() => {}}>{children}</Unbutton>
  );

  expect(getByText(children).textContent).toBe(children);
});

describe("element type", () => {
  test("renders a `span` by default", () => {
    const { container } = render(<Unbutton />);

    expect(container.firstChild.tagName).toBe("SPAN");
  });

  test("can be customized to render a `div`", () => {
    const { container } = render(<Unbutton is="div" />);

    expect(container.firstChild.tagName).toBe("DIV");
  });
});

test("allows pass-through of props", () => {
  const title = "duckduck";

  const { getByTestId } = render(
    <Unbutton data-testid="goose" title={title} />
  );

  expect(getByTestId("goose").getAttribute("title")).toBe(title);
});

test("allows `ref` prop", () => {
  const children = "duckduck";
  const ref = React.createRef();

  render(
    <Unbutton ref={ref} onClick={() => {}}>
      {children}
    </Unbutton>
  );

  expect(ref.current).toBeTruthy();
});

describe("merges props", () => {
  test("merges style prop when adding new `style`", () => {
    const children = "duckduck";

    const { getByText } = render(
      <Unbutton style={{ color: "red" }} onClick={() => {}}>
        {children}
      </Unbutton>
    );

    expect(getByText(children).style).toMatchObject({
      // The cursor is built into `Unbutton`.
      cursor: "pointer",
      color: "red"
    });
  });

  test("allows overwriting of existing `style` value", () => {
    const children = "duckduck";

    const { getByText } = render(
      <Unbutton style={{ cursor: "help" }} onClick={() => {}}>
        {children}
      </Unbutton>
    );

    expect(getByText(children).style).toMatchObject({
      cursor: "help"
    });
  });

  test("allows overwriting of `tabIndex`", () => {
    const children = "duckduck";

    const { getByText } = render(
      <Unbutton tabIndex={-100} onClick={() => {}}>
        {children}
      </Unbutton>
    );

    expect(getByText(children).getAttribute("tabIndex")).toBe("-100");
  });
});

describe("events", () => {
  test("fires event when clicked on", () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <Unbutton onClick={handleClick}>Submit</Unbutton>
    );

    fireEvent.click(getByText("Submit"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("fires event when enter is pressed", () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <Unbutton onClick={handleClick}>Submit</Unbutton>
    );

    fireEvent.keyPress(getByText("Submit"), {
      key: "Enter",
      charCode: 13,
      which: 13
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("fires event when space is pressed", () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <Unbutton onClick={handleClick}>Submit</Unbutton>
    );

    fireEvent.keyPress(getByText("Submit"), {
      key: "Space",
      charCode: 32,
      which: 32
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("fires events on `keypress`, not `keydown`", () => {
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role#Required_JavaScript_Features
    const handleClick = jest.fn();

    const validKey = {
      key: "Enter",
      charCode: 13,
      which: 13
    };

    const { getByText } = render(
      <Unbutton onClick={handleClick}>Submit</Unbutton>
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
      <Unbutton onClick={handleClick}>Submit</Unbutton>
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

    const { getByText } = render(<Unbutton disabled>{children}</Unbutton>);

    expect(getByText(children).getAttribute("tabIndex")).toBe(null);
  });

  test("does not fire event when space is pressed", () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <Unbutton onClick={handleClick} disabled>
        Submit
      </Unbutton>
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
      <Unbutton onClick={handleClick} disabled>
        Submit
      </Unbutton>
    );

    fireEvent.click(getByText("Submit"));
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  test("does not add `cursor: pointer`", () => {
    const children = "duckduck";

    const { getByText } = render(
      <Unbutton style={{ color: "red" }} disabled>
        {children}
      </Unbutton>
    );

    expect(getByText(children).style).toMatchObject({
      color: "red"
    });
  });

  test("does not forward the disabled attribute", () => {
    const children = "duckduck";

    const { getByText } = render(<Unbutton disabled>{children}</Unbutton>);

    expect(getByText(children).getAttribute("disabled")).toBeNull();
  });
});

describe("`onClick` prop is not provided", () => {
  test("does not add `tabIndex`", () => {
    const children = "duckduck";

    const { getByText } = render(<Unbutton>{children}</Unbutton>);

    expect(getByText(children).getAttribute("tabIndex")).toBe(null);
  });

  test("does not error when space is pressed", () => {
    const { getByText } = render(<Unbutton>Submit</Unbutton>);

    fireEvent.keyPress(getByText("Submit"), {
      key: "Space",
      charCode: 32,
      which: 32
    });
  });

  test("does not error event when clicked on", () => {
    const { getByText } = render(<Unbutton>Submit</Unbutton>);
    fireEvent.click(getByText("Submit"));
  });

  test("does not add `cursor: pointer`", () => {
    const children = "duckduck";

    const { getByText } = render(
      <Unbutton style={{ color: "red" }}>{children}</Unbutton>
    );

    expect(getByText(children).style).toMatchObject({
      color: "red"
    });
  });
});
