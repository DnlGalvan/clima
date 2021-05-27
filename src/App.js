import React, {useState} from "react";
import './App.css';
import axios from "axios";

function App() {

  const [tempo, setTempo] = useState(null)

  const instance = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5',
    timeout: 1000,
  });

  async function buscarPrevisao() {
    var cidade = document.getElementById('cidade').value
    const response = await instance.get(`weather?appid=3aeafce6764735fa427255acec3707e0&q=${cidade}&units=metric`)
    setTempo(response.data)
  }

  function checarEnter(event){
    if(event.key === "Enter"){
      buscarPrevisao();
    }
  }

  return (
    <div>
      <input type="text" id="cidade" onKeyPress={checarEnter}/>
      <button onClick={buscarPrevisao}>Previsão</button>
      {
        tempo && (
        <>
          <p>Previsão do tempo</p>
          <p>Cidade: {tempo.name}</p>
          <p>Pais: {tempo.sys.country}</p>
          <p>Clima: {tempo.weather[0].main} - {tempo.weather[0].description}</p>
          <p>Temperatura: {tempo.main.temp}</p>
          <p>Sensação Térmica: {tempo.main.feels_like}</p>
          <p>Temperatura mínima: {tempo.main.temp_min}</p>
          <p>Temperatura máxima: {tempo.main.temp_max}º</p>
          <p>Vento: {tempo.wind.speed}</p>
        </>
        )
      }
    </div>
  );
}

export default App;
