import React from 'react'
import './index.css'

function CocktailItem({cocktail, handleClick}) {
    return (
      <div>
        <h2>{cocktail.strDrink}</h2>
            <img src={cocktail.strDrinkThumb} alt="cocktail" onClick={() => { handleClick(cocktail.idDrink) }}/>
      </div>
    );
}

export default CocktailItem
