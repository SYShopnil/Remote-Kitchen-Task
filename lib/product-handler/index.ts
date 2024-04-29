"use server";
import {
  FileUploadDefaultReturn,
  IDeleteFoodFromListById,
  IDeleteFoodFromListByIdReturn,
  IGetAllProducts,
  IGetAllProductsReturn,
  IGetIndividualProductByIdReturn,
  IProduct,
  IUpdateExistingFoodDataFromMainListReturn,
  addNewFoodReturn,
  paginationReturnInterface,
} from "@src/types/lib/product-handler";
import { IFormValues } from "@src/types/root/c-form";
import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const paginationHandler: (
  inputDataLimit: number,
  dataCollection: any,
  inputPageNo: string
) => Promise<paginationReturnInterface> = async (
  inputDataLimit,
  dataCollection,
  inputPageNo
) => {
  //if data limit has given from body then that will be apply otherwise global default data limit will b apply
  const limitData: number = inputDataLimit || 5;

  //get all data count
  const totalData: number = dataCollection.length;

  //if page number has given from body then that will be apply otherwise global default page number will b apply
  const pageNo: number = +inputPageNo ? +inputPageNo : 1;

  //this amount of data will be skip
  const skipData: number = pageNo * limitData - limitData;

  //total this amount of page we need
  const totalPage: number = Math.ceil(totalData / limitData);

  return {
    dataLimit: limitData,
    skipData,
    totalPage,
  };
};

export async function queryAllProductFromJson(): Promise<IProduct[]> {
  return new Promise(async (resolve) => {
    const parseProduct: IProduct[] = JSON.parse(
      await fs.readFile(process.cwd() + "/public/db/foods.db.json", "utf8")
    );
    resolve(parseProduct);
  });
}

function getPaginationProductByApplyingSkipLimitData(
  products: IProduct[],
  dataLimit: number,
  skipData: number
): IProduct[] {
  /**
   *
   *  Just slice or cut data from  respective products
   *
   */
  const startIndex = skipData;
  const endIndex = skipData + dataLimit;
  return products.slice(startIndex, endIndex);
}

export async function getAllProducts({
  currentPage,
  dataLimit: limit,
  searchInput,
}: IGetAllProducts): Promise<IGetAllProductsReturn> {
  try {
    const getAllProduct: IProduct[] = await queryAllProductFromJson();
    const declareSearchInputRegex = new RegExp(searchInput, "i");

    const applySearchAndGetProduct: IProduct[] = searchInput
      ? getAllProduct.filter((product) => {
          const isMatch =
            declareSearchInputRegex.test(product.desc) ||
            declareSearchInputRegex.test(product.name) ||
            declareSearchInputRegex.test(product.foodId);

          return isMatch;
        })
      : getAllProduct;
    const { dataLimit, skipData, totalPage } = await paginationHandler(
      limit,
      applySearchAndGetProduct,
      currentPage
    );

    const getProductsAfterApplyingSkipAndLimitLogic: IProduct[] =
      await getPaginationProductByApplyingSkipLimitData(
        applySearchAndGetProduct,
        dataLimit,
        skipData
      );
    if (getProductsAfterApplyingSkipAndLimitLogic.length) {
      return {
        message: `${getAllProduct.length} products has found!!`,
        status: 202,
        payload: {
          products: getProductsAfterApplyingSkipAndLimitLogic,
          totalPage: totalPage.toFixed(),
          currentPage: +currentPage,
        },
      };
    } else {
      return {
        message: `No Product found!!!`,
        status: 404,
        payload: {
          products: getProductsAfterApplyingSkipAndLimitLogic,
          totalPage: totalPage.toFixed(),
          currentPage: 0,
        },
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: `Some things went wrong into product fetch`,
      status: 404,
      payload: {
        products: [],
        totalPage: "0",
        currentPage: 0,
      },
    };
  }
}

export async function getIndividualProductById(
  productId: string
): Promise<IGetIndividualProductByIdReturn> {
  try {
    const getAllProduct = await queryAllProductFromJson();
    if (getAllProduct.length) {
      const searchProductFromList = getAllProduct.find(
        (product) => product.foodId == productId
      );
      if (searchProductFromList) {
        return {
          message: `${searchProductFromList.name} has found!!!`,
          status: 202,
          payload: {
            product: searchProductFromList,
          },
        };
      } else {
        return {
          message: `No Product found`,
          status: 404,
          payload: {
            product: null,
          },
        };
      }
    } else {
      return {
        message: `No Product found`,
        status: 404,
        payload: {
          product: null,
        },
      };
    }
  } catch (err) {
    return {
      message: `Somethings went wrong`,
      status: 501,
      payload: {
        product: null,
      },
    };
  }
}

export async function deleteFoodFromListById({
  foodId,
  existingSearchParams,
}: IDeleteFoodFromListById): Promise<IDeleteFoodFromListByIdReturn> {
  let setRedirectUrl = "";
  try {
    const {
      payload: { product: findTargetProduct },
    } = await getIndividualProductById(foodId);
    if (findTargetProduct) {
      const allProducts = await queryAllProductFromJson();
      if (allProducts) {
        const deleteProductFromList = allProducts.filter(
          (product) => product.foodId != foodId
        );
        await fs.readFile(process.cwd() + "/public/db/foods.db.json", "utf8");

        await reUpdateNewFoodListInJSONStore(deleteProductFromList);
        setRedirectUrl = `/foods${
          existingSearchParams && existingSearchParams
        }`;
      } else {
        return {
          message: "No Product Found!!",
          status: 404,
        };
      }
      return {
        message: "",
        status: 202,
      };
    } else {
      return {
        message: "Product Not Found!!",
        status: 404,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: "Somethings wen wrong",
      status: 406,
    };
  } finally {
    if (setRedirectUrl) {
      revalidatePath(setRedirectUrl);
      redirect(setRedirectUrl);
    }
  }
}

//it will upload any base 64 file  in the server
const uploadAnyImage: (
  base64: string,
  foodSlug: string,
  uploadType?: string,
  extension?: string
) => Promise<FileUploadDefaultReturn> = async (
  base64,
  foodSlug,
  uploadType,
  extension
) => {
  const myBase64Data: string = base64.split(";base64,")[1]; //get the base 64 data of my data
  const userId = foodSlug;
  const dataExtension =
    extension ||
    (uploadType !== "default" ? base64.split(";")[0].split("/")[1] : "png"); //get the extension of my data
  const fileName: string = `${userId}${+new Date()}.${dataExtension}`;
  const saveDirectory: string = process.cwd() + "/public/assert/" + fileName;
  const upload: Promise<any> = new Promise((resolve) => {
    //save the data into public folder
    const uploadFIle = fs.writeFile(saveDirectory, myBase64Data, {
      encoding: "base64",
    });
    resolve(uploadFIle);
  });

  await upload;
  return {
    fileName,
  };
};
async function slugGenerator(...content: string[]) {
  let element: string[] = content; //store the parameter array in to a local variable
  let slug: string = "";
  element.map((val) => {
    slug += val + "_";
  });
  slug += Date.now();
  return slug;
}

export async function reUpdateNewFoodListInJSONStore(newList: IProduct[]) {
  const convertNewInstanceToJson = JSON.stringify(newList);
  await fs.writeFile(
    process.cwd() + "/public/db/foods.db.json",
    convertNewInstanceToJson
  );
}

export async function addNewFood(
  formValue: IFormValues,
  search: string
): Promise<addNewFoodReturn> {
  let redirectLink = "";
  try {
    const { desc, image, name, price } = formValue;
    if (desc && image && name && price) {
      const generateFoodId = await slugGenerator(name.split("").join("_"));
      const { fileName: newUploadedFileName } = await uploadAnyImage(
        image,
        generateFoodId,
        "",
        "jpg"
      );
      const createNewImageLink = `/assert/${newUploadedFileName}`;
      const getExistedFoodFromJson = await queryAllProductFromJson();
      const createNewFoodInstance: IProduct = {
        name,
        desc,
        image: createNewImageLink,
        price,
        foodId: generateFoodId,
      };
      getExistedFoodFromJson.push(createNewFoodInstance); //new instance added with previous one
      // store to the db part
      await reUpdateNewFoodListInJSONStore(getExistedFoodFromJson);
      redirectLink = `/foods${search}`;
      return {
        message: "New Food added successfully",
        payload: {
          isAdd: true,
        },
        status: 202,
      };
    } else {
      return {
        message: "Form data not found!!",
        payload: {
          isAdd: false,
        },
        status: 404,
      };
    }
  } catch {
    return {
      message: "Somethings error",
      payload: {
        isAdd: false,
      },
      status: 406,
    };
  } finally {
    if (redirectLink) {
      revalidatePath(redirectLink);
      redirect(redirectLink);
    }
  }
}

export async function updateExistingFoodDataFromMainList(
  redirectUrl: string,
  formValue: IFormValues
): Promise<IUpdateExistingFoodDataFromMainListReturn> {
  let redirectLink = "";
  try {
    const { desc, image, name, price, foodId } = formValue;
    if (desc && image && name && price) {
      const getExistedFoodFromJson = await queryAllProductFromJson();
      if (getExistedFoodFromJson.length) {
        const getFullFoodList = getExistedFoodFromJson;
        const getTargeFoodIndex = getFullFoodList.findIndex(
          (product) => product.foodId == foodId
        );
        const foodDataAfterUpdate: IProduct = {
          name,
          desc,
          foodId: foodId || `${Date.now()}`,
          image,
          price,
        };
        getFullFoodList.splice(getTargeFoodIndex, 1, foodDataAfterUpdate);
        await reUpdateNewFoodListInJSONStore(getFullFoodList);
        redirectLink = redirectUrl;
      } else {
        return {
          message: "Product Not Found!!!",
          payload: {
            isUpdate: false,
          },
          status: 404,
        };
      }
    } else {
      return {
        message: "Form data not found!!",
        payload: {
          isUpdate: false,
        },
        status: 404,
      };
    }
  } catch {
    return {
      message: "Somethings error",
      payload: {
        isUpdate: false,
      },
      status: 406,
    };
  } finally {
    if (redirectLink) {
      revalidatePath(redirectLink);
      redirect(redirectLink);
    }
    return {
      message: "Somethings went wrong",
      payload: {
        isUpdate: false,
      },
      status: 406,
    };
  }
}

export async function foodSearchHandler(redirectUrl: string) {
  try {
  } catch (err) {
    console.log(err);
  } finally {
    revalidatePath(redirectUrl);
    redirect(redirectUrl);
  }
}
