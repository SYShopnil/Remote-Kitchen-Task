import { render, screen } from "@testing-library/react";
import { EDataTestId } from "@src/types/common";
import { CModal } from "..";
import { mockDataForCModal } from "../_mock_data";

describe("When Modal has rendered", () => {
  it("Expect it renders successfully", () => {
    const { getByTestId } = render(
      <CModal {...mockDataForCModal}>
        <h1>Hello world</h1>
      </CModal>
    );
    const myElement = getByTestId(EDataTestId.CModal);
    // const myElement = screen.getByTestId(EDataTestId.CIconWithHandlerButtonContainer);
    expect(myElement).toMatchSnapshot();
  });
});
