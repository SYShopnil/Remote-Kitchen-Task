import { SIconWithMessage, SProductCard } from "@src/components/root";
import { CPaginationTrack } from "@src/components/root/c-pagnination-track";
import { EDataTestId } from "@src/types/common";
import { ISProductSection } from "@src/types/compound/s-products-section";
import { CProductAddSection } from "../c-product-add-section";
import { CProductSearchBarContainer } from "../c-product-search-bar-container";
import { IconName } from "@src/types/root/_icon";

export async function SProductSection({
  requestForGetAllProduct,
}: ISProductSection) {
  const {
    payload: { products, currentPage, totalPage },
  } = await requestForGetAllProduct;

  return (
    <div data-testid={EDataTestId.SProductSection}>
      {/* search bar and add food product section */}
      <div className={`flex justify-evenly items-start space-x-2 pl-[2rem]`}>
        <div className="flex-[1_1_80%]">
          <CProductSearchBarContainer />
        </div>
        <div className="flex-[1_1_20%]">
          <CProductAddSection />
        </div>
      </div>

      {/* when there don't have any product in the store */}
      {products.length ? (
        <>
          {/* dynamically show all products */}
          <div
            className={`grid grid-cols-12 gap-2  mt-[5rem] pl-[2rem] place-content-center`}
          >
            {products.map((product) => {
              return (
                <div
                  className="col-span-12  md:col-span-6  lg:col-span-4"
                  key={product.foodId}
                >
                  <SProductCard
                    desc={product.desc}
                    id={product.foodId}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                  />
                </div>
              );
            })}
          </div>
          <div className="p-[2rem]">
            <CPaginationTrack
              currentPage={+currentPage}
              totalPage={+totalPage}
            />
          </div>
        </>
      ) : (
        <SIconWithMessage
          icon={IconName.TbError404}
          message="Product Not Found!!"
          url="/foods"
        />
      )}
    </div>
  );
}
