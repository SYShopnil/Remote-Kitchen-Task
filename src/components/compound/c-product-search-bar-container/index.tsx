"use client";

import { foodSearchHandler } from "@root/lib/product-handler";
import { CSearchBar } from "@src/components/root/search-bar";
import { EDataTestId } from "@src/types/common";
import { usePathname } from "next/navigation";
import React from "react";

export const CProductSearchBarContainer = () => {
  const path = usePathname();
  const searchHandler: (inputData: string) => void = async (inputData) => {
    const searchInput = "?search=" + inputData;
    const redirectUrl = `${path}${searchInput}`;

    await foodSearchHandler(redirectUrl);
  };
  return (
    <div data-testid={EDataTestId.CProductSearchBarContainer}>
      <CSearchBar setSearchInput={searchHandler} />
    </div>
  );
};
