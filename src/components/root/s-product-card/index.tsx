import { BtnColorSchema } from "@src/types/root";
import { CRedirectButton } from "../button";
import Image from "next/image";
import { EDataTestId } from "@src/types/common";
import { ISProductCard } from "@src/types/root/s-product-card";
import { CIconWithHandlerButtonContainer } from "@src/components/compound";
import { EMode } from "@src/types/compound/c-icon-with-handler-button-container";

export function SProductCard({
  desc,
  id: productId,
  image,
  name,
  price,
}: ISProductCard) {
  const currentSelectedProductDataForUpdatePhase = {
    name,
    desc,
    image,
    price,
    foodId: productId,
  };
  return (
    <div
      data-testid={EDataTestId.SProductCard}
      className={`h-auto  w-[100%] md:w-[18.75rem] text-center relative `}
    >
      <div
        className={`rounded-sm flex justify-center items-center w-[100%] lg:w-[18.75rem] min-h-[24rem] `}
      >
        <Image
          alt={name}
          src={image}
          placeholder="blur"
          blurDataURL="/assert/blur-demo-product.jpg"
          priority
          height={384}
          width={300}
        />
      </div>

      {/* below part container */}
      <div className={`h-[11.125rem] `}>
        <p className="text-[#777777] font-bold text-lg">{name}</p>
        <p className="text-[#79494B] font-bold text-[1rem] line-clamp-4">
          {price}$
        </p>
        <p className={`text-[#777777] font-bold text-sm line-clamp-2 mb-4`}>
          {desc}
        </p>
        <div className="flex justify-center items-center">
          <CRedirectButton
            btnText="View Details"
            colorSchema={BtnColorSchema.SolidBgWhiteTextGreen}
            isArrow={false}
            isOpenNewTab={false}
            redirectLink="/"
          />
        </div>
      </div>
      <div
        className={` absolute top-[3%] right-[10%] flex justify-evenly w-[5rem] bg-[#7F4D4F] p-2 rounded-md`}
      >
        <div>
          <CIconWithHandlerButtonContainer
            mode={EMode.UPDATE}
            foodId={productId}
            existFoodData={currentSelectedProductDataForUpdatePhase}
          />
        </div>

        <div>
          <CIconWithHandlerButtonContainer
            mode={EMode.DELETE}
            foodId={productId}
          />
        </div>
      </div>
    </div>
  );
}
