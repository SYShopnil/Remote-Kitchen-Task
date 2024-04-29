"use client";
import {
  deleteFoodFromListById,
  updateExistingFoodDataFromMainList,
} from "@root/lib/product-handler";
import { CForm, CIconWithHandlerButton } from "@src/components/root";
import {
  EMode,
  ICIconWithHandlerButtonContainer,
} from "@src/types/compound/c-icon-with-handler-button-container";
import { IconName } from "@src/types/root/_icon";

import React, { useState } from "react";
import { CModal } from "../c-modal";
import { IFormValues } from "@src/types/root/c-form";
import { usePathname, useSearchParams } from "next/navigation";
import { BtnColorSchema, IButton } from "@src/types/root";
import { formFieldConfigForUpdatePhase } from "./config";
import { EDataTestId } from "@src/types/common";

export const CIconWithHandlerButtonContainer = ({
  mode,
  foodId,
  existFoodData,
}: ICIconWithHandlerButtonContainer) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const btnConfigForFoodAdd: IButton = {
    btnText: "Update Food",
    colorSchema: BtnColorSchema.SolidBgGrayTextViolet,
    isArrow: false,
  };
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const updateClientHandler = async (formValues: IFormValues) => {
    try {
      const search = searchParams.toString();
      const redirectPath = `${pathName}${search && `?${search}`}`;
      const {
        payload: { isUpdate },
      } = await updateExistingFoodDataFromMainList(redirectPath, formValues);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async () => {
    try {
      const existingSearchParams = searchParams.toString()
        ? "?" + searchParams.toString()
        : "";
      const { message } = await deleteFoodFromListById({
        foodId,
        existingSearchParams,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const initialFormValueForUpdate: IFormValues = {
    name: existFoodData?.name,
    desc: existFoodData?.desc,
    image: existFoodData?.image,
    price: existFoodData?.price,
    foodId: existFoodData?.foodId,
  };

  const getMode = () => {
    switch (mode) {
      case EMode.UPDATE: {
        return (
          <div data-testid={EDataTestId.CIconWithHandlerButtonContainer}>
            <CIconWithHandlerButton
              icon={IconName.MdModeEdit}
              clickHandler={() => setIsModalOpen(!isModalOpen)}
            />
            <div>
              <div>
                <CModal
                  isOpen={isModalOpen}
                  setIsOpen={(value) => setIsModalOpen(value)}
                >
                  <CForm
                    buttonInfo={btnConfigForFoodAdd}
                    onSubmit={updateClientHandler}
                    formFields={formFieldConfigForUpdatePhase}
                    formTitle="Update Food"
                    initialValue={initialFormValueForUpdate}
                  />
                </CModal>
              </div>
            </div>
          </div>
        );
      }
      case EMode.DELETE: {
        return (
          <CIconWithHandlerButton
            icon={IconName.MdDelete}
            clickHandler={deleteHandler}
          />
        );
      }
    }
  };

  return <div>{getMode()}</div>;
};
