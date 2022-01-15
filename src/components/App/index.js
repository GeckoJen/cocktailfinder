import React, { useState, useEffect } from "react";
import "./App.css";
import SearchByName from "../SearchByName";
import SearchByIngredient from "../SearchByIngredient";
import CocktailSection from "../CocktailSection";
import CocktailRecipe from "../CocktailRecipe";

function App() {
  const [nameInput, setNameInput] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [cocktails, setCocktails] = useState(null);
  const [submitName, setSubmitName] = useState(true);
  const [submitIngredient, setSubmitIngredient] = useState(true);
  const [cocktailRecipeSelected, setCocktailRecipeSelected] = useState(false);
  const [chosenCocktail, setChosenCocktail] = useState({});
  const [cocktailID, setCocktailID] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);

  function handleNameInput(text) {
    setNameInput(text);
  }

  function handleIngredientInput(text) {
    setIngredientInput(text);
  }

  useEffect(() => {
    async function fetchData() {
      console.log(nameInput);
      let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nameInput}`;
      console.log(url);
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
      setNameInput("");
      setCocktails(data.drinks);
      setCocktailRecipeSelected(false);
      if (!data.drinks) {
        setErrorMessage(true);
      } else {
        setErrorMessage(false);
      }
    }
    if (nameInput) {
      fetchData();
    }
  }, [submitName]);

  function searchByNameFunction() {
    setSubmitName(!submitName);
    console.log("changed submitName");
  }

  useEffect(() => {
    async function fetchData() {
      console.log(ingredientInput);
      let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientInput}`;
      console.log(url);
      let response = await fetch(url);
      let data;
      try {
        data = await response.json();
      } catch (err) {
        console.log(err);
        setErrorMessage(true);
      } finally {
        console.log(data);
        setIngredientInput("");
        if (data) {
          setCocktails(data.drinks);
          setCocktailRecipeSelected(false);
          setErrorMessage(false);
        }
      }
    }
    if (ingredientInput) {
      fetchData();
    }
  }, [submitIngredient]);

  function searchByIngredientFunction() {
    setSubmitIngredient(!submitIngredient);
    console.log("changed submitIngredient");
  }

  function selectRecipe(id) {
    setCocktailRecipeSelected(true);
    setCocktailID(id);
  }

  useEffect(() => {
    async function fetchData() {
      console.log(cocktailID);
      let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailID}`;
      console.log(url);
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
      setChosenCocktail(data.drinks[0]);
    }
    if (cocktailID) fetchData();
  }, [cocktailRecipeSelected]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cocktailID]);

  return (
    <div className="App">
      <h1>The Cocktail Library</h1>
      <SearchByName
        nameInput={nameInput}
        handleInput={handleNameInput}
        searchByNameFunction={searchByNameFunction}
      />
      <SearchByIngredient
        ingredientInput={ingredientInput}
        handleInput={handleIngredientInput}
        searchByIngredientFunction={searchByIngredientFunction}
      />
      {errorMessage && (
        <h3>
          No results found. Please check your spelling or try another search.
        </h3>
      )}
      {cocktails && !cocktailRecipeSelected && (
        <CocktailSection cocktails={cocktails} handleClick={selectRecipe} />
      )}
      {!cocktails && (
        <img
          id="defaultImage"
          src="https://images.unsplash.com/photo-1605270012917-bf157c5a9541?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
          alt="display of cocktails"
        />
      )}
      {cocktailRecipeSelected && (
        <CocktailRecipe
          cocktail={chosenCocktail}
          backToSearchResults={() => {
            setCocktailRecipeSelected(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
