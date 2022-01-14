import React from "react";
import CocktailItem from "../CocktailItem";

function CocktailSection({ cocktails, handleClick}) {
  

  return (
    <div>
     { cocktails.map(function(cocktail){
       return <CocktailItem key={cocktail.idDrink} cocktail={cocktail} handleClick={ handleClick}/>
     })}
    </div>
  );
}

export default CocktailSection;
