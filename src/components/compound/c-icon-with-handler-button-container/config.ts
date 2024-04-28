import { FormElementEnum, IFormFieldProp } from "@src/types/root/c-form";

export const formFieldConfigForUpdatePhase: IFormFieldProp[] = [
  {
    elementType: FormElementEnum.Input,
    label: "Product Name",
    space: 2,
    isRequired: true,
    name: "name",
    type: "input",
    placeholder: "Give Name",
  },
  {
    elementType: FormElementEnum.Input,
    label: "Product Price",
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
];
