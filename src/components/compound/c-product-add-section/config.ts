import { FormElementEnum, IFormFieldProp } from "@src/types/root/c-form";

export const formFieldConfig: IFormFieldProp[] = [
  {
    elementType: FormElementEnum.Input,
    label: "Food Name",
    space: 2,
    isRequired: true,
    name: "name",
    type: "input",
    placeholder: "Give Name",
  },
  {
    elementType: FormElementEnum.Input,
    label: "Food Price",
    space: 2,
    isRequired: true,
    name: "price",
    type: "input",
    placeholder: "Give Price",
  },
  {
    elementType: FormElementEnum.TextArea,
    label: "Description",
    space: 2,
    isRequired: true,
    name: "desc",
    type: "input",
    placeholder: "Give Description",
  },
  {
    elementType: FormElementEnum.Upload,
    label: "Upload Food Picture",
    space: 2,
    isRequired: true,
    name: "image",
    type: "input",
    placeholder: "Give image",
  },
];
