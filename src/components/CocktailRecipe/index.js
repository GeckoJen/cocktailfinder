import React from "react";
import "./index.css";
import { v4 as uuidv4 } from "uuid";

function CocktailRecipe({ cocktail }) {
  const cocktailIngredients = Object.entries(cocktail).filter(
    ([key, value]) => key.includes("strIngredient") && value
  );

  // 0: (2) ['strIngredient1', 'Tequila']
  // 1: (2) ['strIngredient2', 'Triple sec']
  // 2: (2) ['strIngredient3', 'Lime juice']
  // 3: (2) ['strIngredient4', 'Salt']

  const cocktailIngredientsQuantity = Object.entries(cocktail).filter(
    ([key, value]) => key.includes("strMeasure") && value
  );

  // 0: (2) ['strMeasure1', '1 1/2 oz ']
  // 1: (2) ['strMeasure2', '1/2 oz ']
  // 2: (2) ['strMeasure3', '1 oz ']

  const cocktailIngAndQuantities = [];
  for (let i = 0; i < cocktailIngredients.length; i++) {
    if (cocktailIngredientsQuantity[i]) {
      cocktailIngAndQuantities.push([
        cocktailIngredients[i][1],
        cocktailIngredientsQuantity[i][1],
      ]);
    } else {
      cocktailIngAndQuantities.push([cocktailIngredients[i][1], ""]);
    }
  }

  // 0: (2) ['Tequila', '1 1/2 oz ']
  // 1: (2) ['Triple sec', '1/2 oz ']
  // 2: (2) ['Lime juice', '1 oz ']
  // 3: (2) ['Salt', '']

  return (
    <div>
      <h2>{cocktail.strDrink}</h2>
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {cocktailIngAndQuantities.map(function (ingredient) {
            return (
              <tr key={uuidv4()}>
                <td>{ingredient[1]}</td>
                <td>{ingredient[0]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p id="recipeInstructions">{cocktail.strInstructions}</p>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
    </div>
  );
}

export default CocktailRecipe;

// idDrink: "11007",
// strDrink: "Margarita",
// strInstructions: "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
// strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
// strIngredient1: "Tequila",
// strIngredient2: "Triple sec",
// strIngredient3: "Lime juice",
// strIngredient4: "Salt",
// strIngredient5: null,
// strMeasure1: "1 1/2 oz ",
// strMeasure2: "1/2 oz ",
// strMeasure3: "1 oz ",
