import React from "react";
import { cleanup, render, fireEvent } from "react-testing-library";
import ClickableBox from "./index";

afterEach(cleanup);

test("renders into document", () => {
  const { getByTestId } = render(
    <ClickableBox data-testid="goose" onClick={() => {}} />
  );

  expect(getByTestId("goose")).toBeTruthy();
});

test("renders a `div` by default", () => {
  const { container } = render(<ClickableBox onClick={() => {}} />);

  expect(container.firstChild.tagName).toBe("DIV");
});

test("can be customized to render a `span`", () => {
  const { container } = render(<ClickableBox is="span" onClick={() => {}} />);

  expect(container.firstChild.tagName).toBe("SPAN");
});

test("allows pass-through of props", () => {
  const title = "duckduck";

  const { getByTestId } = render(
    <ClickableBox data-testid="goose" onClick={() => {}} title={title} />
  );

  expect(getByTestId("goose").getAttribute("title")).toBe(title);
});

test("properly sets children", () => {
  const children = "duckduck";

  const { getByText } = render(
    <ClickableBox onClick={() => {}}>{children}</ClickableBox>
  );

  expect(getByText(children).textContent).toBe(children);
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
