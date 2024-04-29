import { ICModal } from "@src/types/compound/c-modal";
import React from "react";

export const mockDataForCModal: ICModal = {
  isOpen: true,
  setIsOpen: () => {
    return true;
  },
  title: "For Test",
  children: React.createElement("h1", "Hello"),
};
