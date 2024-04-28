"use client";

import { Button, CForm } from "@src/components/root";
import { BtnColorSchema, IButton } from "@src/types/root";
import React, { useState } from "react";
import { CModal } from "../c-modal";
import { IFormValues } from "@src/types/root/c-form";
import { addNewFood } from "@root/lib/product-handler";

import { useSearchParams } from "next/navigation";
import { formFieldConfig } from "./config";

export const CProductAddSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const btnConfigForFoodAdd: IButton = {
    btnText: "Add Food",
    colorSchema: BtnColorSchema.SolidBgVioletTextWhite,
    isArrow: false,
  };
  const searchParams = useSearchParams();

  const addFoodButtonHandler = async (formValues: IFormValues) => {
    try {
      const search = `?${searchParams.toString()}`;
      const {
        payload: { isAdd }, //this will show as a message
      } = await addNewFood(formValues, search);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div>
        <CModal
          isOpen={isModalOpen}
          setIsOpen={(value) => setIsModalOpen(value)}
        >
          <CForm
            buttonInfo={btnConfigForFoodAdd}
            onSubmit={addFoodButtonHandler}
            formFields={formFieldConfig}
            formTitle="Add Food"
          />
        </CModal>
      </div>
      <div>
        <Button
          btnText={"Add++"}
          isArrow={true}
          colorSchema={BtnColorSchema.SolidBgWhiteTextGreen}
          clickHandler={() => setIsModalOpen(!isModalOpen)}
        />
      </div>
    </div>
  );
};
