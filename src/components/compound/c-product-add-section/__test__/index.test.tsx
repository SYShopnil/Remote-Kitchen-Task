import { render, screen } from "@testing-library/react";
import { EDataTestId } from "@src/types/common";
import { CProductAddSection } from "..";

describe("When Product Add section has rendered", () => {
  it("Expect it renders successfully", () => {
    const { getByTestId } = render(<CProductAddSection />);
    const myElement = getByTestId(EDataTestId.CProductAddSection);
    // const myElement = screen.getByTestId(EDataTestId.CIconWithHandlerButtonContainer);
    expect(myElement).toMatchSnapshot();
  });
});
