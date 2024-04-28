"use client";

import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import styles from "./index.module.css";
import { ICSearchBar } from "@src/types/root/search-bar";

export const CSearchBar = ({
  setSearchInput: setSearchInputProps,
}: ICSearchBar) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className={styles["search-container"]}>
      <input
        type="text"
        className={styles["search-input"]}
        placeholder="Search..."
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <RiSearchLine
        className={styles["search-icon"]}
        onClick={() => setSearchInputProps(searchInput)}
      />
    </div>
  );
};
