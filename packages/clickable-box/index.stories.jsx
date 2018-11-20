import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ClickableBox from "./index";

storiesOf("ClickableBox", module).add("Default", () => (
  <div>
    <ClickableBox onClick={action("Clicked on `ClickableBox`")}>
      This is a ClickableBox
    </ClickableBox>
  </div>
));
