import React from "react";
import { cleanup, render } from "react-testing-library";
import ClickableButton from "./index";

afterEach(cleanup);

test("renders into document", () => {
  const { getAllByTestId } = render(
    <ClickableButton data-testid="goose" onClick={() => {}} />
  );

  expect(getAllByTestId("goose")).toBeTruthy();
});
