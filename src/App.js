import React, {useEffect, useState} from "react";
import './App.css';
import axios from "axios";

function App() {

  const [tempo, setTempo] = useState(null)
  const [paginaAtual, setPaginaAtual] = useState('Home')
  const [estados, setEstados] = useState([])
  const [cidades, setCidades] = useState([])

  const instance = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5',
    timeout: 1000,
  });

  const ibge = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1',
    timeout: 1000,
  });

  useEffect( () => {
    async function pegarEstados() {
      const response = await ibge.get('localidades/estados')
      setEstados(response.data)
    }
    pegarEstados()
  }, [])

  useEffect( () => {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude
      var lon = position.coords.longitude
      buscarPrevisaoPorCoord(lat, lon)
    });
  }, [navigator.geolocation])

  async function buscarPrevisao() {
    var cidade = document.getElementById('cidade').value
    const response = await instance.get(`weather?appid=3aeafce6764735fa427255acec3707e0&q=${cidade}&units=metric`)
    setTempo(response.data)
    document.getElementById("cidade").value = ""
  }

  async function buscarPrevisaoPorCoord(lat, lon) {
    const response = await instance.get(`weather?lat=${lat}&lon=${lon}&appid=3aeafce6764735fa427255acec3707e0&units=metric`)
    setTempo(response.data)
  }

  function checarEnter(event){
    if(event.key === "Enter"){
      buscarPrevisao();
    }
  }

  function carregarSobre() {
    setPaginaAtual('Sobre')
  }

  function carregarHome() {
    setPaginaAtual('Home')
  }

  async function pegarCidades(uf) {
    const response = await ibge.get(`localidades/estados/${uf}/municipios`)
      setCidades(response.data)
      console.log(response.data)
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
        {
          paginaAtual === "Sobre" ? (
              <div className="sobre">
                <h3>Feito por Daniel Galvan</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id dolor enim.
                  Duis blandit vitae velit sed tempus. Nunc finibus arcu vel scelerisque efficitur.
                  Etiam iaculis felis posuere, dignissim nisi vitae, mollis turpis. Nunc eget tincidunt magna.
                  Nullam commodo ante at sagittis ultricies. Quisque sed condimentum mi. Cras pellentesque, nunc non cursus tempus, nibh tortor blandit nibh, nec venenatis arcu orci ac erat. Ut blandit pretium urna. Donec vulputate ligula orci. Integer ut ipsum est. Sed eget malesuada nulla, nec feugiat dolor. Nunc interdum nisi elementum, malesuada nisi non, convallis est.</p>
              </div>
            ) : (
        <>
        <div id="selecao">
          <select name="estados-brasil" onChange={(event) => pegarCidades(event.currentTarget.value)}>
            <option value="UF">Selecione um Estado</option>
            {
              estados.map( (estado) => (
                <option key={estado.id} value={estado.id}>{estado.nome}</option>
              ))
            }
          </select>
          <input type="text" id="cidade" placeholder="Cidade" onKeyPress={checarEnter}/>
          <button onClick={buscarPrevisao}>Previsão</button>
          {
            tempo && (
            <>
              <p id="titulo">Previsão do Tempo para: {tempo.name.toUpperCase()} - {tempo.sys.country.toUpperCase()}</p>
                <h3 className="cidade">Cidade: {tempo.name}
                  <p>Pais: {tempo.sys.country}</p>
                  <p>Clima: {tempo.weather[0].main} - {tempo.weather[0].description}</p>
                  <p>Temperatura: {tempo.main.temp}ºC</p>
                  <p>Sensação Térmica: {tempo.main.feels_like}ºC</p>
                  <p>Temperatura mínima: {tempo.main.temp_min}ºC</p>
                  <p>Temperatura máxima: {tempo.main.temp_max}ºC</p>
                  <p>Velocidade Vento: {tempo.wind.speed} m/s</p>
                </h3>
              </>
            )
            }
        </div>
        <div id="noticia">
          <h1>Maio termina frio e chuvoso na Grande SP</h1>
          <img src="chuva.jpg" alt="chuva"/>
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
        </>           
        )
      }
      </div>
      <footer>
        <div id="rodape">
          <p id="logo">CLIMAPREV</p>
          <div id="links">
            <a href="#" onClick={carregarHome}><strong>HOME</strong></a><br/>
            <a href="#">Previsão</a><br/>
            <a href="#">Tempo</a><br/>
            <a href="#">Clima</a><br/>
            <a href="#" onClick={carregarSobre}>Sobre</a><br/>
          </div>
          <p id="copyright">Copyright 2021 - Climatempo. Todos os direitos reservados - Site Parceiro do UOL Notícias.</p>
        </div>
      </footer>
    </main>
  );
}

export default App;
