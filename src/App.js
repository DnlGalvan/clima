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
    <main>
      <div id="cabecalho">
        <h1>CLIMAPREV</h1>
      </div>
      <div id="cabecalho_bottom">
        <h3>Clima e Previsão do Tempo</h3>
      </div>
      
      <div id="selecao">
        <select name="estados-brasil">
          <option value="UF">Selecione um Estado</option>
          <option value="AC">Acre</option>
          <option value="AL">Alagoas</option>
          <option value="AP">Amapá</option>
          <option value="AM">Amazonas</option>
          <option value="BA">Bahia</option>
          <option value="CE">Ceará</option>
          <option value="DF">Distrito Federal</option>
          <option value="ES">Espírito Santo</option>
          <option value="GO">Goiás</option>
          <option value="MA">Maranhão</option>
          <option value="MT">Mato Grosso</option>
          <option value="MS">Mato Grosso do Sul</option>
          <option value="MG">Minas Gerais</option>
          <option value="PA">Pará</option>
          <option value="PB">Paraíba</option>
          <option value="PR">Paraná</option>
          <option value="PE">Pernambuco</option>
          <option value="PI">Piauí</option>
          <option value="RJ">Rio de Jeneiro</option>
          <option value="RN">Rio Grande do Norte</option>
          <option value="RS">Rio Grande do Sul</option>
          <option value="RO">Rondônia</option>
          <option value="RR">Roraima</option>
          <option value="SC">Santa Catarina</option>
          <option value="SP">São Paulo</option>
          <option value="SE">Sergipe</option>
          <option value="TO">Tocantins</option>
        </select>
        <input type="text" id="cidade" placeholder="Cidade" onKeyPress={checarEnter}/>
        <button onClick={buscarPrevisao}>Previsão</button>
        {
          tempo && (
          <>
            <p id="titulo">Previsão do tempo</p>
            <p>Cidade: {tempo.name}</p>
            <p>Pais: {tempo.sys.country}</p>
            <p>Clima: {tempo.weather[0].main} - {tempo.weather[0].description}</p>
            <p>Temperatura: {tempo.main.temp}ºC</p>
            <p>Sensação Térmica: {tempo.main.feels_like}ºC</p>
            <p>Temperatura mínima: {tempo.main.temp_min}ºC</p>
            <p>Temperatura máxima: {tempo.main.temp_max}ºC</p>
            <p>Velocidade Vento: {tempo.wind.speed}</p>
          </>
          )
        }
      </div>
    </main>
  );
}

export default App;
