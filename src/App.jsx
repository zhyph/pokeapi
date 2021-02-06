import { getElementError } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import "./App.css";
import imgpadrao from './assets/buscar.png'

export default function App() {

  const [nome, setnome] = useState();
  const [imagem, setimagem] = useState(false);

  const getPokemons = async () => {
  document.getElementById('buttonbuscar').value = ''
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`+nome);
    const data = await response.json();
    setimagem(data.sprites.other["official-artwork"].front_default)
    console.log(imagem)  
    console.log(data);
  };

  return (
 
    <div className="App" style={{display:'flex' , flexDirection:'column' , alignItems:'center' , justifyContent:'center' , marginTop:"30px"}}>
            <input id='buttonbuscar' style={{margin:'20px'}} type='text' placeholder='Nome do Pokemon' onChange={(e)=>{setnome(e.target.value)}}/>
      <button  style={{margin:'20px'}}  onClick={getPokemons}>Buscar</button>
      <img width='200px' height='200px' src={imagem ? imagem : imgpadrao}/>
    </div>

  );
}

