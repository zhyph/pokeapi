import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [poke, setPoke] = useState([]); //recebe pokemons
  const [pokeID, setPokeID] = useState(""); //recebe pokemonid
  const [submit, setSubmit] = useState("");
  const [query, setQuery] = useState("bulbasaur");
  const [id, setId] = useState(1);

  useEffect(() => {
    getPokemons();
  }, [query]);

  function getNumbers(inputString) {
    var regex = /\d+\.\d+|\.\d+|\d+/g,
      results = [],
      n;

    while ((n = regex.exec(inputString))) {
      results.push(parseFloat(n[0]));
    }

    return results;
  }

  const getUrlId = (_) => {
    poke.map((item) => {
      if (item.name === query) {
        const res = getNumbers(item.url);
        setId({ id: res[1] });
        // console.log(`${res[1]}`)
      }
    });
  };

  const getPokeId = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + id);
    // console.log(response)
    const data = await response.json();
    setPokeID(data);
    console.log(data);
  };

  const getPokemons = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
    // console.log(response)
    const data = await response.json();
    setPoke(data.results);
    console.log(data.results);
  };

  const updateSearch = (e) => {
    setSubmit(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(submit);
    setSubmit("");
    getUrlId();
    getPokeId();
  };

  const fodase = () => {
    if (pokeID !== "") {
      return (
        <img
          src={pokeID.sprites.other.dream_world.front_default}
          alt="pokeman"
        />
      );
    }
  };

  return (
    <div className="App">
      <h1>Ulgy pokemons</h1>
      <form onSubmit={getSearch}>
        <input
          type="text"
          placeholder="Choose a pokemon"
          onChange={updateSearch}
        />
        <button id="btn" type="submit">
          GO!
        </button>
      </form>
      {pokeID.height}
      {fodase()}
    </div>
  );
}

export default App;
