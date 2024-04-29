import { ICommonReturnData } from "@src/types/common";

export interface IProduct {
  foodId: string;
  image: string;
  name: string;
  price: string;
  desc: string;
}

export interface IGetAllProductsReturn extends ICommonReturnData {
  payload: {
    products: IProduct[];
    totalPage: string;
    currentPage: number;
  };
}
export interface IGetIndividualProductByIdReturn extends ICommonReturnData {
  payload: {
    product: IProduct | null;
  };
}

export interface IDeleteFoodFromListByIdReturn extends ICommonReturnData {}

export interface paginationReturnInterface {
  dataLimit: number;
  skipData: number;
  totalPage: number;
}

export interface IGetAllProducts {
  currentPage: string;
  dataLimit: number;
  searchInput: string;
}

export interface IDeleteFoodFromListById extends Pick<IProduct, "foodId"> {
  existingSearchParams: string;
}

export interface FileUploadDefault {
  fileName: string;
}

export interface FileUploadDefaultReturn {
  fileName: string;
}

export interface addNewFoodReturn extends ICommonReturnData {
  payload: {
    isAdd: boolean;
  };
}

export interface IUpdateExistingFoodDataFromMainListReturn
  extends ICommonReturnData {
  payload: {
    isUpdate: boolean;
  };
}
