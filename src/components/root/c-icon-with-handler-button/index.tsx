"use client";

import React from "react";
import { SIconStore } from "../_icon";
import { ICIconWithHandlerButton } from "@src/types/root/c-icon-with-handler-button";

export const CIconWithHandlerButton = ({
  icon: iconName,
  clickHandler,
}: ICIconWithHandlerButton) => {
  return (
    <button onClick={clickHandler} className={`bg-white`}>
      <SIconStore iconName={iconName} fill={"7F4D4F"} />
    </button>
  );
};
