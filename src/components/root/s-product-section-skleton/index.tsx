import React from "react";
import { RiSearchLine } from "react-icons/ri";

export const SProductSectionSkeleton = () => {
  const totalDemoCardSkeleton = Array(9).fill(0);
  return (
    <div>
      <div className="flex justify-evenly items-start space-x-2 pl-[2rem] ">
        {/* search bar */}
        <div className="flex-[1_1_80%] flex items-center justify-between bg-gray-200 rounded-md p-2">
          <div className="w-3/4 bg-gray-300 h-10 animate-pulse rounded-md"></div>
          <div className="w-1/4 bg-gray-300 h-10 animate-pulse rounded-md flex items-center justify-center">
            <RiSearchLine className="text-gray-400 h-6 w-6" />
          </div>
        </div>
        {/* button */}
        <div className="flex-[1_1_20%] ">
          <button className="bg-gray-300 text-gray-300 font-semibold py-2 px-4 rounded-md w-32 h-13 animate-pulse">
            Loading...
          </button>
        </div>
      </div>
      <div
        className={`grid grid-cols-12 gap-2  mt-[5rem] pl-[2rem] place-content-center`}
      >
        {totalDemoCardSkeleton.map((_, ind) => {
          return (
            <div
              role="status"
              key={ind}
              className="col-span-12  md:col-span-6  lg:col-span-4  max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
            >
              <div>
                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                  >
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                  </svg>
                </div>
                <div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
