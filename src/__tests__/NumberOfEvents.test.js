import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";
import { render } from "@testing-library/react";

describe("<NumberOfEvents /> Component", () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
  });

  test("has the input textbox", () => {
    const input = NumberOfEventsComponent.queryByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  test("default number of events is 32", () => {
    const input = NumberOfEventsComponent.queryByRole("textbox");
    expect(input).toHaveValue("32");
  });

  test("updates number of events when user types", async () => {
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.queryByRole("textbox");
    await user.type(numberTextBox, "123");

    // 32 (the default value already written) + 123
    expect(numberTextBox).toHaveValue("32123");
  });
});
