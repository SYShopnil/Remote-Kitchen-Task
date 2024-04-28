import { IProduct } from "@src/types/lib/product-handler";

export enum EMode {
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}
export interface ICIconWithHandlerButtonContainer
  extends Pick<IProduct, "foodId"> {
  mode: EMode;
  existFoodData?: IProduct;
}
