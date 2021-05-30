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
    document.getElementById("cidade").value = ""
  }

  function checarEnter(event){
    if(event.key === "Enter"){
      buscarPrevisao();
    }
  }

  return (
    <main>
      <header>
        <div id="cabecalho">
          <h1>CLIMAPREV</h1>
        </div>
        <div id="cabecalho_bottom">
          <h3>Clima e Previsão do Tempo</h3>
        </div>
      </header>
      <div id="container">
      
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
              <p id="titulo">Previsão do Tempo para: {tempo.name.toUpperCase()} - {tempo.sys.country.toUpperCase()}</p>
                <p class="cidade">Cidade: {tempo.name}
                  <p>Pais: {tempo.sys.country}</p>
                  <p>Clima: {tempo.weather[0].main} - {tempo.weather[0].description}</p>
                  <p>Temperatura: {tempo.main.temp}ºC</p>
                  <p>Sensação Térmica: {tempo.main.feels_like}ºC</p>
                  <p>Temperatura mínima: {tempo.main.temp_min}ºC</p>
                  <p>Temperatura máxima: {tempo.main.temp_max}ºC</p>
                  <p>Velocidade Vento: {tempo.wind.speed} m/s</p>
                </p>
            </>
            )
          }
        </div>
        <div id="noticia">
          <h1>Maio termina frio e chuvoso na Grande SP</h1>
          <img src="chuva.jpg" />
          <p>O último dia de maio será marcado por chuva e queda de temperatura no estado de São Paulo.
            Após a passagem de uma frente fria, uma área de baixa pressão atmosférica irá se formar na costa e reforçar áreas de instabilidade.</p>
          <p>A situação mais preocupante com relação à chuva será sobre o litoral paulista, onde o tempo fica carregado e chove praticamente o dia todo.
            Em todas as áreas de costa do estado, há risco de chuva forte e volumosa, com potencial para transtornos.</p>
          <p>Na região metropolitana, o predomínio também será de céu nublado e a chuva pode ocorrer a qualquer hora. De forma geral,
            a expectativa é apenas para chuva fraca a moderada, mas não se descarta o risco de chuva forte. A temperatura fica baixa na cidade, e a máxima não passa dos 20ºC.</p>
          <p>No interior paulista, muitas nuvens se espalham, mas o sol aparece em alguns momentos.
            Há risco de chuva moderada a forte nas áreas próximas à divisa com o Paraná, no Vale do Paraíba, Serra da Mantiqueira e na região de Bragança Paulista.
            Nas demais localidades, a chuva será fraca.</p>
        </div>
      </div>
    </main>
  );
}

export default App;
