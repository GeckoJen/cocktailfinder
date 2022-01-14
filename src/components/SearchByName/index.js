import React from 'react'

function SearchByName({nameInput, handleInput, searchByNameFunction}) {



    return (
      <div>
        <form
                onSubmit=
                {(event) => {
                    event.preventDefault();
            searchByNameFunction();
          }}
        >
          <input
            type="text"
            placeholder="search by cocktail name"
            value={nameInput}
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

export default SearchByName
