import { tipsData } from "../../assets/tips";
import { React, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
export default function Carousel2() {

  const [curr, setCurr] = useState(tipsData[0]);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? tipsData.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === tipsData.length - 1 ? 0 : curr + 1));
  }; 
  
  const tipHeader  = tipsData.map((data, key) => {

    return (
        <div key={key}>
            {data.tipType}
        </div>
    )   
  })  

  const tipDescription  = tipsData.map((data, key) => {

    return (
        <div key={key}>
            {data.description}
        </div>
    )   
  })

  return (
    <div className="flex justify-center">
        
      <div class="justify-center p-10 leading-normal overflow-hidden relative">
        
        <div class="flex h-5/6 transition-transform ease-out duration-500 bm-5 text-m font-bold text-gray-900  border-gray-200 rounded-lg shadow
             dark:border-gray-700"
        >
            {/* {tipsData.map((data, key) => { */}
              {/* return ( */}
                <>
                    <div className="transition-transform ease-out w- duration-500 flex flex-col bm-5 text-m font-bold text-gray-900 dark:text-white bg-white border border-gray-200 rounded-lg shadow
                    hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" style={{transform: `translateX(-${curr * 30}%)`}}>
                        {/* <div key={key}>{data.tipType}</div> */}
                        {/* <div key={key}>{data.description}</div> */}
                        {tipHeader.at(0)}
                        {tipDescription.at(0)}
                    </div>

                    <div className="transition-transform ease-out w- duration-500 flex flex-col bm-5 text-m font-bold text-gray-900 dark:text-white bg-white border border-gray-200 rounded-lg shadow
                    hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" style={{transform: `translateX(-${curr * 30}%)`}}>
                        {/* <div key={key}>{data.tipType}</div> */}
                        {/* <div key={key}>{data.description}</div> */}
                        {tipHeader.at(1)}
                        {tipDescription.at(1)}
                    </div>

                </>



              {/* ); */}
            {/* })} */}
        </div>

        

        <div className="absolute inset-0 flex items-center justify-between p-10 ">
          <button className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white "onClick={prev}>
            <ChevronLeft size={30} />
          </button>

          <button className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white " onClick={next}>
            <ChevronRight size={30} />
          </button>
        </div>

        <div className="absolute bottom-4 right-0 left-0">
            <div className="flex items-center justify-center gap-2">
                {tipsData.map((_,i) => (
                    <div className={`
                        transition-all w-3 h-3 bg-white rounded-full ${curr === i ? "p-2" : "bg-opacity-50"}
                    `}/> 
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
