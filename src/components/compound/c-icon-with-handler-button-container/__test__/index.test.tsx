import { render, screen } from "@testing-library/react";
import { EDataTestId } from "@src/types/common";
import { CIconWithHandlerButtonContainer } from "..";
import { mockDataForTest } from "../_mock_data";

describe("When Icon with handler button container has rendered", () => {
  it("Expect it renders successfully for update phase", () => {
    const { getByTestId } = render(
      <CIconWithHandlerButtonContainer {...mockDataForTest[0]} />
    );
    const myElement = getByTestId(EDataTestId.CIconWithHandlerButtonContainer);
    // const myElement = screen.getByTestId(EDataTestId.CIconWithHandlerButtonContainer);
    expect(myElement).toMatchSnapshot();
  });

  it("Expect it renders successfully for Delete phase", () => {
    const { getByTestId } = render(
      <CIconWithHandlerButtonContainer {...mockDataForTest[1]} />
    );
    const myElement = getByTestId(EDataTestId.CIconWithHandlerButtonContainer);
    // const myElement = screen.getByTestId(EDataTestId.CIconWithHandlerButtonContainer);
    expect(myElement).toMatchSnapshot();
  });
});
