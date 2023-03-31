import React from "react";
import { tipsData } from "../../assets/tips";

const CardsComponent = () => {

    {tipsData.map((data, key) => {
        return (
          <>
            <div key={key}>{data.tipType}</div>
            <div key={key}>{data.description}</div>
          </>    
        )
      })
    }

};

export default CardsComponent;