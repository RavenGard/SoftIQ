import Cards from "../Components/Tips/Cards";
import TipAccordion from "../Components/Tips/Accordion";
import Carousel from "../Components/Tips/Carousel";

export const Tips = () => {
  return (
    <div>
      {/* <Cards /> */}
      <Carousel/>
      <div class=" flex flex-col justify-center">
        <TipAccordion />
      </div>
    </div>
  );
};
