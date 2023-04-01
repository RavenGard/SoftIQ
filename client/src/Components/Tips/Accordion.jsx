/**
 * example followed: https://www.material-tailwind.com/docs/react/accordion
 */

import React from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { tipsData } from "../../assets/tips";


function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const TipAccordion = () => {

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  // idea: put the map function up hear so then I can return a new accordion for each tip.
  const theAccordion = tipsData.map((data, key) => { 
  return (
    <div key={key}>
        <div class=" flex flex-col items-center ">
            <div class="flex items-center justify-between w-9/12 p-10 font-medium text-left text-gray-500 border border-b-1 border-gray-200 rounded-md focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-neutral-950 hover:text-white hover:bg-indigo-950 dark:hover:bg-gray-500">

              <Accordion open={open === data.tipId} icon={<Icon id={data.tipId} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(data.tipId)}>
                  {data.tipTitle}
                </AccordionHeader>

                <AccordionBody>
                  {data.description}
                </AccordionBody>
              </Accordion>
              </div>
        </div>
    </div>
  );
})


// need to have a return statement inside the component that is OUTSIDE of a function 
return (
  <div className="m-20">
    {theAccordion}
  </div>
)
  
};
export default TipAccordion;
