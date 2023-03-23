import Carousel from "../Components/Tips/Carousel"
import TipAccordion from "../Components/Tips/Accordion"

export const Tips = () => {
    return (
        <div>
            <Carousel /> 
            <div class=" flex justify-center pt-4">
                <TipAccordion />  
            </div>
            
        </div>   
    )
}