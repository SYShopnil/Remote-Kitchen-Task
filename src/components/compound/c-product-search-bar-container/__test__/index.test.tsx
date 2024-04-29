import { render, screen } from "@testing-library/react";
import { EDataTestId } from "@src/types/common";
import { CProductSearchBarContainer } from "..";

describe("When Product Search bar container has rendered", () => {
  it("Expect it renders successfully", () => {
    const { getByTestId } = render(<CProductSearchBarContainer />);
    const myElement = getByTestId(EDataTestId.CProductSearchBarContainer);
    // const myElement = screen.getByTestId(EDataTestId.CIconWithHandlerButtonContainer);
    expect(myElement).toMatchSnapshot();
  });
});
