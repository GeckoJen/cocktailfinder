import React from 'react'
import './index.css'

function SearchByIngredient({ingredientInput, handleInput, searchByIngredientFunction}) {
    return (
        <div>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
            searchByIngredientFunction(ingredientInput);
          }}
        >
        <input
          type="text"
          placeholder="search by cocktail ingredient"
          value={ingredientInput}
          onChange={(e) => {
            handleInput(e.target.value);
          }}
        />
        <button type="submit">
          Search
            </button>
            </form>
      </div>
    );
}

export default SearchByIngredient
