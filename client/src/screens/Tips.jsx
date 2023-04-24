import Cards from "../Components/Tips/Cards";
import TipAccordion from "../Components/Tips/Accordion";
import Carousel from "../Components/Tips/Carousel";
import CardComponent from "../Components/Tips/CardComponent2";
import Carousel2 from "../Components/Tips/Carousel2";

export const Tips = () => {
  return (
    <div>
      {/* <Cards />
        
      <Carousel/> */}
      {/* <CardComponent/> */}
      <Carousel2/>
      <div class=" flex flex-col justify-center">
        <TipAccordion/>
      </div>
    </div>
  );
};