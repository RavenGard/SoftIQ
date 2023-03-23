import Carousel from "../Components/Tips/Carousel"
import TipAccordion from "../Components/Tips/Accordion"

export const Tips = () => {
    return (
        <div>
            <Carousel /> 
            <div class=" flex flex-col justify-center">
                <TipAccordion />  
                <TipAccordion />  
            </div>
            
        </div>   
    )
}