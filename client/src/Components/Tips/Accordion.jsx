import React from "react";
import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { tipsData } from "../../assets/tips";

// interface TipsProps {
//     id: Number,

// }

const TipAccordion = () => {

  const [open, setOpen] = useState(1);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  // idea: put the map function up hear so then I can return a new accordion for each tip.
  const theAccordion = tipsData.map((data, key) => {
  return (
    <div key={key}>
        <div class=" flex flex-col pt-14 items-center">
            <div class="flex items-center justify-between w-9/12 p-5 font-medium text-left text-gray-500 border border-b-1 border-gray-200 rounded-md focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">

              <Accordion open={open === data.tipId}>
                <AccordionHeader onClick={() => handleOpen(data.tipId)}>
                  {data.tipType}
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
  theAccordion
)
  
};
export default TipAccordion;
