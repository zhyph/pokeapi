/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  // const getPokemons = async () => {
  //   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + nome);
  //   const data = await response.json();
  //   setimagem(data.sprites.other["official-artwork"].front_default);
  //   console.log(imagem);
  //   console.log(data);
  // };

  const getPokemon = async () => {
    const arr = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      arr.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(arr);
      // console.log(res.data.game_indices.lenght);
    } catch (e) {
      window.alert("This name does not match with any pokemon");
      console.log(e);
    }
  };
  // console.log();

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };

  // useEffect(() => {
  //   getPokemon();
  // }, []);

  return (
    // <div className="App" style={{ display: "flex", flexDirection: "column" }}>
    //   <input
    //     type="text"
    //     placeholder="Nome do Pokemon"
    //     onChange={(e) => {
    //       setnome(e.target.value);
    //     }}
    //   />
    //   <button onClick={getPokemons}>Buscar</button>
    //   <img src={imagem} />
    // </div>
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter a pokemon name"
          />
        </label>
      </form>
      {pokemonData.map((data) => {
        const height = ((data.height * 3.9) / 39.37).toFixed(2);

        return (
          <div className="container" key={data.id}>
            <img src={data.sprites.front_default} alt="pokemon" />
            <div className="divTable">
              <div className="divTableBody">
                <div className="divTableRow">
                  <div className="divTableCell">Type</div>
                  <div className="divTableCell">{pokemonType}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Height</div>
                  <div className="divTableCell">
                    {" "}
                    {height > 1 ? height + " Meters" : height + " Centimeters"}
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Weight</div>
                  <div className="divTableCell">
                    {" "}
                    {(data.weight / 4.3 / 2.205).toFixed(2)} kgs
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Number of Battles</div>
                  <div className="divTableCell">{data.game_indices.length}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
