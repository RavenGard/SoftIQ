import { React, useState,useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

export default function Carousel2() {

  const [curr, setCurr] = useState(0);
  const [tips, setTips] = useState([])

  useEffect(() => {

    let requestBody = {
      query: `
            query {
                getTips{
                    tipId
                    tipType
                    tipTitle
                    description
                }
            }
          `,
    };
    fetch("http://localhost:3000/softiq", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
          console.log(resData.data.getTips);
          setTips( resData.data.getTips);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const prev = () => {
    setCurr((curr) => (curr === 0 ? tip.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === tip.length - 1 ? 0 : curr + 1));
  };

  // const tipsDatas = tipsData.map((data, key) => {
  //   return (
  //     <div classname="flex p-2" key={key}>
  //       <div>{data.tipType}</div>
  //       {data.description}
  //     </div>
  //   );
  // });

  const tip = tips.map((data, key) => {
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
          curr={curr === tip.tipId}
          className="transition-transform ease-out duration-500 flex justify-center w-8/12 p-2 bm-5 text-m font-bold text-gray-900 dark:text-white bg-white border border-gray-200 rounded-lg shadow
                      hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {/* <div key={key}>{data.tipType}</div> */}
          {/* <div key={key}>{data.description}</div> */}
          {tip.at(curr)}
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