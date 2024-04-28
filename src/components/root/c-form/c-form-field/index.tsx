"use client";

import { FormElementEnum, IFormField } from "@src/types/root/c-form";
import { CSingleFileUploader } from "../c-single-file-uploader";

// FormField
export const FormField = ({
  fieldProps,
  value,
  onChange,
  formErrors,
  uploadHandler,
}: IFormField) => {
  // Destructure
  const { name, isRequired, label, elementType, type, placeholder } =
    fieldProps;

  // common attributes
  const attributes = {
    id: name,
    name: name,
    value,
    onChange,
    placeholder: isRequired ? placeholder + "*" : placeholder,
    autoComplete: "Off",
    "data-testid": name,
  };

  /**
   * Used for input/textarea
   */
  const errorBorder = "border-dangerLight";
  const normalBorder = "border-transparent";
  const inputBox =
    "border-[1px] border-solid block w-full focus:outline-0 focus:shadow-none focus-visible:outline-0  placeholder:capitalize placeholder:text-blackLight text-blackLight bg-gray text-base rounded-lg p-[1rem_1.5rem]";

  /**
   * Used for coloring label text
   */
  const errorText = "text-dangerLight";
  const normalText = "text-blackLight";

  /**
   * Used for labels in FormFields
   * EXCEPTION: Checkbox
   */
  const normalLabelClass = "text-base font-medium text-blackLight";

  switch (elementType) {
    case FormElementEnum.TextArea: {
      return (
        <div>
          {label && (
            <label className={normalLabelClass} htmlFor={name}>
              {label}
            </label>
          )}
          <textarea
            className={`${inputBox} ${
              formErrors[name] ? errorBorder : normalBorder
            } resize-none min-h-[130px]`}
            {...attributes}
          />
        </div>
      );
    }
    case FormElementEnum.Checkbox: {
      return (
        <div className="inline-flex items-center flex-wrap gap-2">
          {label && (
            <>
              {/* Hide input element */}
              <input
                className="appearance-none hidden"
                type={type}
                checked={value === "true" ? true : false}
                {...attributes}
              />
              <label
                className={`text-base font-medium inline-flex items-center flex-wrap gap-[.625rem] cursor-pointer`}
                htmlFor={name}
              >
                {/* Checkbox span, htmlFor is being used to enable checkbox functionality so this span
                has to be inside the label element */}
                <span
                  className={`relative w-[18px] h-[18px] border border-solid  rounded-sm inline-flex items-center after:content-[''] after:absolute after:w-[12px] after:h-[12px] after:bg-secondary after:rounded-sm after:translate-x-[-50%] after:translate-y-[-50%] after:left-[50%] after:top-[50%] ${
                    value === "true"
                      ? "after:visible border-secondary"
                      : `after:invisible ${
                          formErrors[name] ? errorBorder : "border-[#cbcbcb]"
                        }`
                  }`}
                  data-testid="checkbox-box"
                ></span>
                {/* Label text */}
                <span
                  className={`inline-block relative top-[2px]  ${
                    formErrors[name] ? errorText : normalText
                  }`}
                  data-testid="checkbox-label"
                >
                  {label}
                </span>
              </label>
            </>
          )}
        </div>
      );
    }
    /**
     * Return normal input field by default
     */
    case FormElementEnum.Upload: {
      return (
        <div>
          {label && (
            <label className={normalLabelClass} htmlFor={name}>
              {label}
            </label>
          )}
          <CSingleFileUploader filePassHandler={uploadHandler} fileType="img" />
        </div>
      );
    }
    default: {
      return (
        <div>
          {label && (
            <label className={normalLabelClass} htmlFor={name}>
              {label}
            </label>
          )}
          <input
            className={`${inputBox} ${
              formErrors[name] ? errorBorder : normalBorder
            }`}
            type={`${type}`}
            {...attributes}
          />
        </div>
      );
    }
  }
};
