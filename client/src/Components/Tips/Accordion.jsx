import React from "react";
import { Fragment, useState } from "react";
import { Accordion, AccordionHeader, AccordionBody, } from "@material-tailwind/react";
// import demoData from "../images/demodata.jpg";
// import images from "client\src\assets\demoDataPic.jpg";


//let image = "https://www.searchenginejournal.com/wp-content/uploads/2019/07/the-essential-guide-to-using-images-legally-online.png";

function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
        fill="none"
        viewBox="24 24 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
}

const TipAccordion = () => {

    const [open, setOpen] = useState(1);
 
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (

        <div>
            <div id="accordion-collapse" data-accordion="collapse" class= " flex flex-col pt-14 items-center" >
                
                <div class="flex items-center justify-between w-9/12 p-5 font-medium text-left text-gray-500 border border-b-1 border-gray-200 rounded-md focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Fragment>
                        <Accordion open={open===1} icon={<Icon id={1} open={open} />}>
                            <AccordionHeader onClick={() => handleOpen(1)} >
                                What is Flowbite?
                            </AccordionHeader>

                            <AccordionBody>
                                Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.
                            </AccordionBody>
                        </Accordion>
                    </Fragment>

                </div>
                
            </div>

        </div>   
        
    );
};
export default TipAccordion;