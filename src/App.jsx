import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {

  const [nome, setnome] = useState([]);
  const [imagem, setimagem] = useState([]);

  const getPokemons = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`+nome);
    const data = await response.json();
    setimagem(data.sprites.other["official-artwork"].front_default)
    console.log(imagem)  
    console.log(data);
  };

  return (
    <div className="App" style={{display:'flex' , flexDirection:'column'}}>
            <input type='text' placeholder='Nome do Pokemon' onChange={(e)=>{setnome(e.target.value)}}/>
      <button onClick={getPokemons}>Buscar</button>
      <img src={imagem}/>
    </div>
  );
}

