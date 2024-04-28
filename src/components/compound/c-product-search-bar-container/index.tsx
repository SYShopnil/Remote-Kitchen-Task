"use client";

import { foodSearchHandler } from "@root/lib/product-handler";
import { CSearchBar } from "@src/components/root/search-bar";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export const CProductSearchBarContainer = () => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const searchHandler: (inputData: string) => void = async (inputData) => {
    const currentSearchParams = searchParams.toString();
    const searchAllOtherSearchParamsExceptSearch = currentSearchParams
      .split("&")
      .filter((element) => {
        const convertElementToRegex = new RegExp("search=", "i");
        return !convertElementToRegex.test(element);
      });

    //this is set the search params in the redirect  url => /foods?search=[*]
    const searchInput = searchAllOtherSearchParamsExceptSearch.length
      ? "?" + searchAllOtherSearchParamsExceptSearch[0] + "&search=" + inputData
      : inputData && "?" + "&search=" + inputData;
    const redirectUrl = `${path}${searchInput}`;

    await foodSearchHandler(redirectUrl);
  };
  return (
    <>
      <CSearchBar setSearchInput={searchHandler} />
    </>
  );
};
