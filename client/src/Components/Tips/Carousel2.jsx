import { tipsData } from "../../assets/tips";
import { React, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function Carousel2() {
  const [curr, setCurr] = useState(0);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? tipsData.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === tipsData.length - 1 ? 0 : curr + 1));
  };

  const tipsDatas = tipsData.map((data, key) => {
    return (
      <div classname="flex p-2" key={key}>
        <div>{data.tipType}</div>
        {data.description}
      </div>
    );
  });

  return (
    <div class="flex pt-10 justify-center h-36 transition-transform ease-out duration-500">
      {/* {tipsData.map((data, key) => {
              return ( */}
      <>
        <button className="px-2" onClick={prev}>
          <ChevronLeft size={30} />
        </button>

        <div
          curr={curr === tipsData.tipId}
          className="transition-transform ease-out duration-500 flex justify-center w-8/12 p-2 bm-5 text-m font-bold text-gray-900 dark:text-white bg-white border border-gray-200 rounded-lg shadow
                      hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {/* <div key={key}>{data.tipType}</div> */}
          {/* <div key={key}>{data.description}</div> */}
          {tipsDatas.at(curr)}
          {/* {tipDescription.at(curr)} */}
        </div>
      </>

      <button
        className="px-2"
        onClick={next}
      >
        <ChevronRight size={30} />
      </button>
    </div>
  );
}