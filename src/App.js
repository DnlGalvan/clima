import React, {useEffect, useState} from "react";
import './App.css';
import axios from "axios";

function App() {

  const [tempo, setTempo] = useState(null)
  const [paginaAtual, setPaginaAtual] = useState('Home')
  const [estados, setEstados] = useState([])
  const [cidades, setCidades] = useState([])
  const [cidadeSelecionada, setCidadeSelecionada] = useState('')

  const instance = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5',
    timeout: 1000,
  });

  const ibge = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1',
    timeout: 10000,
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
          <h3>Clima e Previs??o do Tempo</h3>
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
                  Nullam commodo ante at sagittis ultricies. Quisque sed condimentum mi. Cras pellentesque, nunc non cursus tempus,
                  nibh tortor blandit nibh, nec venenatis arcu orci ac erat. Ut blandit pretium urna. Donec vulputate ligula orci.
                  Integer ut ipsum est. Sed eget malesuada nulla, nec feugiat dolor. Nunc interdum nisi elementum, malesuada nisi non, convallis est.</p>
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
          <select name="cidades-brasil" id="cidade" onKeyPress={checarEnter}>
            <option value="cidade">Selecione uma cidade</option>
            {
              cidades.map( (cidade) => (
                <option key={cidade.nome} value={cidade.nome}>{cidade.nome}</option>
              ))
            }
          </select>
          <button onClick={buscarPrevisao}>Previs??o</button>
          {
            tempo && (
            <>
              <p id="titulo">Previs??o do Tempo para: {tempo.name.toUpperCase()} - {tempo.sys.country.toUpperCase()}</p>
                <h3 className="cidade">Cidade: {tempo.name}
                  <p>Pais: {tempo.sys.country}</p>
                  <p>Clima: {tempo.weather[0].main} - {tempo.weather[0].description}</p>
                  <p>Temperatura: {tempo.main.temp}??C</p>
                  <p>Sensa????o T??rmica: {tempo.main.feels_like}??C</p>
                  <p>Temperatura m??nima: {tempo.main.temp_min}??C</p>
                  <p>Temperatura m??xima: {tempo.main.temp_max}??C</p>
                  <p>Velocidade Vento: {tempo.wind.speed} m/s</p>
                </h3>
              </>
            )
            }
        </div>
        <div id="noticia">
          <h1>Maio termina frio e chuvoso na Grande SP</h1>
          <img src="chuva.jpg" alt="chuva"/>
          <p>O ??ltimo dia de maio ser?? marcado por chuva e queda de temperatura no estado de S??o Paulo.
            Ap??s a passagem de uma frente fria, uma ??rea de baixa press??o atmosf??rica ir?? se formar na costa e refor??ar ??reas de instabilidade.</p>
          <p>A situa????o mais preocupante com rela????o ?? chuva ser?? sobre o litoral paulista, onde o tempo fica carregado e chove praticamente o dia todo.
            Em todas as ??reas de costa do estado, h?? risco de chuva forte e volumosa, com potencial para transtornos.</p>
          <p>Na regi??o metropolitana, o predom??nio tamb??m ser?? de c??u nublado e a chuva pode ocorrer a qualquer hora. De forma geral,
            a expectativa ?? apenas para chuva fraca a moderada, mas n??o se descarta o risco de chuva forte. A temperatura fica baixa na cidade, e a m??xima n??o passa dos 20??C.</p>
          <p>No interior paulista, muitas nuvens se espalham, mas o sol aparece em alguns momentos.
            H?? risco de chuva moderada a forte nas ??reas pr??ximas ?? divisa com o Paran??, no Vale do Para??ba, Serra da Mantiqueira e na regi??o de Bragan??a Paulista.
            Nas demais localidades, a chuva ser?? fraca.</p>
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
            <a href="#">Previs??o</a><br/>
            <a href="#">Tempo</a><br/>
            <a href="#">Clima</a><br/>
            <a href="#" onClick={carregarSobre}>Sobre</a><br/>
          </div>
          <p id="copyright">Copyright 2021 - Climatempo. Todos os direitos reservados - Site Parceiro do UOL Not??cias.</p>
        </div>
      </footer>
    </main>
  );
}

export default App;
