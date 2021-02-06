import { getElementError } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import "./App.css";
import imgpadrao from './assets/200.gif'
import axios from 'axios'

export default function App() {

  const [nome, setnome] = useState();
  const [imagem, setimagem] = useState(false);


  const getPokemons = async () => {
    if (document.getElementById('buttonbuscar').value !== '') {
      document.getElementById('buttonbuscar').value = ''
      axios.get(`https://pokeapi.co/api/v2/pokemon/` + nome).then((res) => {
        console.log(res.data)
        setimagem(res.data.sprites.other["official-artwork"].front_default)
        setnome(false)
      }).catch((erro) => {
        console.log(erro)
        window.alert('O nome do pokemon não existe')
        setimagem(false)
      })
    } else {
      window.alert('Precisa inserir um nome')
    }
  };

  return (

    <div className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "30px"
      }}>

      <input id='buttonbuscar'
        style={{ margin: '20px' }}
        type='text'
        placeholder='Nome do Pokemon'
        onChange={(e) => { setnome(e.target.value) }} />

      <button style={{ margin: '20px' }}
        onClick={getPokemons}>Buscar</button>

      <img width='200px'
        height='200px'
        style={{ borderRadius: '50%' }}
        src={imagem ? imagem : imgpadrao} />

    </div>

  );
}



  /*const getPokemons = async () => { // COM FETCH
    if (nome) {
      document.getElementById('buttonbuscar').value = ''
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + nome);
      const data = await response.json();
      setimagem(data.sprites.other["official-artwork"].front_default)
      console.log(imagem)
      console.log(data);
      setnome(false)
    } else {
      window.alert('Precisa inserir um nome')
    }  
*/
