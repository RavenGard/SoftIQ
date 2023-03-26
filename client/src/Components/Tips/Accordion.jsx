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

        <div class=" flex flex-col pt-14 items-center">

            <Fragment>
            <div class="flex items-center justify-between w-9/12 p-5 font-medium text-left text-gray-500 border border-b-1 border-gray-200 rounded-md focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">

              <Accordion open={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)}>
                  {tipHeader.at(0)}
                </AccordionHeader>

                <AccordionBody>
                  {tipDescription.at(0)}   
                </AccordionBody>
              </Accordion>
              </div>
              <div class="flex items-center mb-4 justify-between w-9/12 p-5 font-medium text-left text-gray-500 border border-b-1 border-gray-200 rounded-md focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Accordion open={open === 2}>
                <AccordionHeader onClick={() => handleOpen(2)}>
                  {tipHeader.at(1)}
                </AccordionHeader>

                <AccordionBody>
                  {tipDescription.at(1)}   
                </AccordionBody>
              </Accordion>
              </div>

              <div class="flex items-center justify-between w-9/12 p-5 font-medium text-left text-gray-500 border border-b-1 border-gray-200 rounded-md focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">

              <Accordion open={open === 3}>
                <AccordionHeader onClick={() => handleOpen(3)}>
                  {tipHeader.at(5)}
                </AccordionHeader>

                <AccordionBody>
                  {tipDescription.at(5)}   
                </AccordionBody>
              </Accordion>
              </div>

              <div class="flex items-center  mb-4 justify-between w-9/12 p-5 font-medium text-left text-gray-500 border border-b-1 border-gray-200 rounded-md focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">

              <Accordion open={open === 4}>
                <AccordionHeader onClick={() => handleOpen(4)}>
                  {tipHeader.at(6)}
                </AccordionHeader>

                <AccordionBody>
                  {tipDescription.at(6)}   
                </AccordionBody>
              </Accordion>
              </div>
            </Fragment>
        </div>
  );
};
export default TipAccordion;
