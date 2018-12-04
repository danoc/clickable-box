import React from "react";
import { cleanup, render, fireEvent } from "react-testing-library";
import ClickableBox from "./index";

afterEach(cleanup);

test("renders into document", () => {
  const children = "duckduck";

  const { getByText } = render(
    <ClickableBox onClick={() => {}}>{children}</ClickableBox>
  );

  expect(getByText(children).textContent).toBe(children);
});

describe("element type", () => {
  test("renders a `span` by default", () => {
    const { container } = render(<ClickableBox onClick={() => {}} />);

    expect(container.firstChild.tagName).toBe("SPAN");
  });

  test("can be customized to render a `div`", () => {
    const { container } = render(<ClickableBox is="div" onClick={() => {}} />);

    expect(container.firstChild.tagName).toBe("DIV");
  });
});

test("allows pass-through of props", () => {
  const title = "duckduck";

  const { getByTestId } = render(
    <ClickableBox data-testid="goose" onClick={() => {}} title={title} />
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
  test("merges style prop when adding new `style`", () => {
    const children = "duckduck";

    const { getByText } = render(
      <ClickableBox onClick={() => {}} style={{ color: "red" }}>
        {children}
      </ClickableBox>
    );

    expect(getByText(children).style).toMatchObject({
      // The cursor is built into `ClickableBox`.
      cursor: "pointer",
      color: "red"
    });
  });

  test("allows overwriting of existing `style` value", () => {
    const children = "duckduck";

    const { getByText } = render(
      <ClickableBox onClick={() => {}} style={{ cursor: "help" }}>
        {children}
      </ClickableBox>
    );

    expect(getByText(children).style).toMatchObject({
      cursor: "help"
    });
  });

  test("allows overwriting of `tabIndex`", () => {
    const children = "duckduck";

    const { getByText } = render(
      <ClickableBox onClick={() => {}} tabIndex={-100}>
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

    fireEvent.keyDown(getByText("Submit"), {
      key: "Enter",
      keyCode: 13,
      which: 13
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("fires event when space is pressed", () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <ClickableBox onClick={handleClick}>Submit</ClickableBox>
    );

    fireEvent.keyDown(getByText("Submit"), {
      key: "Space",
      keyCode: 32,
      which: 32
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not fire event when period key is pressed", () => {
    const handleClick = jest.fn();

    const { getByText } = render(
      <ClickableBox onClick={handleClick}>Submit</ClickableBox>
    );

    fireEvent.keyDown(getByText("Submit"), {
      key: ".",
      keyCode: 91,
      which: 91
    });

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
