/* Componente do mapa em si. */

// Componentes importados
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import FilterControl from '../FilterControl';
import MarkerClusterGroup from '../MarkerClusterGroup';

// CSS, dados e scripts
import "./style.css";
import filters from "../../filtros.json";

// Imagens
import markerIcon from "./marker-icon.png";
import markerShadow from "./marker-shadow.png";
import markerIcon2x from "./marker-icon-2x.png";

// Token de acesso do Mapbox
const TOKEN_MAPBOX = process.env.REACT_APP_TOKEN_MAPBOX;

// Variáveis de configuração
const DEFAULT_ZOOM = 4;
const MAX_ZOOM = 14;
const ZOOM_LEVELS = {
    "região": 5,
    "estado": 7
};

export class Mapa extends React.Component {
  constructor(props) {
    super(props);

    this.icon = new L.Icon({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIcon2x,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });

    // Objetos de referência ao mapa e seus elementos
    this.mapRef = React.createRef();
    this.popupRef = React.createRef();
    this.previousCenter = null;

    // Binds necessários para reter o escopo da classe
    this.handlePopupOpen = this.handlePopupOpen.bind(this);
    this.handlePopupClose = this.handlePopupClose.bind(this);
    this.saveToSessionStorage = this.saveToSessionStorage.bind(this);
    this.mapLoaded = this.mapLoaded.bind(this);
    this.backFilter = this.backFilter.bind(this);
    
    // Objeto com registros de IES obtidos no banco de dados
    this.censo = [];
        
    // Restaurar estado do mapa da session storage, caso haja
    const prevState = window.sessionStorage.getItem('state');
    this.state = JSON.parse(prevState) || {
    	center: null,
    	zoom: null,
    	searchFilters: []
    };
  }
  
  componentDidMount() {
  	this.props.updateMap(this.mapRef);
  }

  // Fecha o Popup aberto no momento
  closeCurrentPopup() {
    this.popupRef.current._closeButton.click();
  }

  /* Coloca o foco no Popup aberto e adiciona listeners adequados
  para fins de acessibilidade. */
  handlePopupOpen(e) {
    this.previousCenter = e.popup._source._map.getCenter();    
    e.popup._container.tabIndex = "0";
    e.popup._container.focus();
    
    e.popup._container.onkeydown = (key) => {
      if (key.code === "Escape") {
        e.popup._closeButton.click();
      }
    };
    
    this.saveToSessionStorage();
  }

  /* Devolve o foco ao Marker após fechar o Popup e recentraliza
  o mapa. */
  handlePopupClose(e) {
    e.popup._source._icon.focus();
    e.popup._source._map.panTo(this.previousCenter);
    this.previousCenter = null;
  }

  // Método chamado após carregar o mapa
  mapLoaded(e) {
  	// Restaurar o estado do mapa, caso a informação tenha sido salva
  	if (this.state.center && this.state.zoom)
  		e.target.setView(JSON.parse(this.state.center), this.state.zoom);
  	if (this.state.searchFilters.length === 2)
  		this.retrieveIesEstado(this.state.searchFilters[1]);
  }
  
  // Salva o estado do mapa em session storage
  saveToSessionStorage() {
  	const current = this.mapRef.current;
  	
  	if(current) {
  		const newState = {
  			center: JSON.stringify(current.getCenter()),
  			zoom: current.getZoom(),
  			searchFilters: this.state.searchFilters
  		}
  		window.sessionStorage.setItem('state', JSON.stringify(newState));
  	}
  }
  
  /* Cria e retorna um L.divIcon para ser usado com Markers de
  filtro.
  	 txt: O texto a ser exibido.
  	 name: Nome da região/estado/etc.
  	 type: Aceita os valores especificado em ZOOM_LEVELS.
  	 latLong: Array com os valores de latitude e longitude,
  	 respectivamente.
  */
  getDivIcon(txt, name, type, latLong) {
    // Construir o elemento HTML
    let divEl = L.DomUtil.create("div");
    divEl.setAttribute("aria-label", name);
    divEl.setAttribute("tabIndex", "0");
    let spanEl = L.DomUtil.create("span", "", divEl);
    spanEl.innerHTML = txt;
    
    // Adicionar listeners    
    divEl.addEventListener("click", () => {
    	this.applySearchFilter(
    		type,
            latLong,
            name
        );
    });
    
    divEl.addEventListener("keyup", (e) => {
    	if(e.key === "Enter") {
    		this.applySearchFilter(
    			type,
            	latLong,
            	name
        	);
        }
    });
    
    // Construir ícone com o elemento HTML
  	const icon = L.divIcon({
  		className: 'my-div-icon',
  		html: divEl
  	});
  	
  	return icon;
  }
  
  // Retorna ao nível anterior de filtros de busca
  backFilter() {
  	const currentFilters = this.state.searchFilters;
  	switch (currentFilters.length) {
  		case 2:
  			this.mapRef.current.setZoom(ZOOM_LEVELS['região']);
  			break;
  		case 1:
  			this.mapRef.current.setZoom(DEFAULT_ZOOM);
  			break;
  		default:
  			return null;
  	}
  	currentFilters.pop();
  	this.setState( { searchFilters: currentFilters } );
  }
  
  /* Método chamado ao selecionar uma região/estado/etc.
  	 type: Aceita os valores especificado em ZOOM_LEVELS.
  	 latLong: Array com os valores de latitude e longitude,
  	 respectivamente, nos quais deve-se centrar o zoom. Se null,
  	 não usar nenhum ponto como foco do zoom.
  	 name: Nome da região/estado/etc.
  */
  applySearchFilter(type, latLong, name) {
  	let currentFilters = this.state.searchFilters;
  	
  	if(!(type in ZOOM_LEVELS))
  		return null;
  		
  	if(type === "estado")
  		this.retrieveIesEstado(name);
  	
  	if(latLong)
  		this.mapRef.current.setView(latLong, ZOOM_LEVELS[type]);
  	else
  		this.mapRef.current.setZoom(ZOOM_LEVELS[type]);
  	
    currentFilters.push(name);
    this.setState({searchFilters: currentFilters});
  }
  
  /* Obtém as IES situadas no estado especificado e as armazena em
  this.censo. */
  retrieveIesEstado(nomeEstado) {
    const currentFilters = this.state.searchFilters;
    const estadoObj = filters[currentFilters[0]]['estados'][nomeEstado];
    
  	return fetch(`/api/ies/estados/${estadoObj['CO_UF_IES']}`)
      .then(res => res.json())
      .then(jsonRes => {
      	this.censo = jsonRes;
      	this.setState(this.state); // Forçar atualização
      });
  }

  render() {  	
    return (
      <MapContainer
        center={[-14.235, -51.9253]}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        zoomControl={false}
        ref={this.mapRef}
        whenReady={this.mapLoaded}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${TOKEN_MAPBOX}`}
          tileSize={512}
          zoomOffset={-1}
          minZoom={DEFAULT_ZOOM}
          maxZoom={MAX_ZOOM}
          bounds={[
            [5.404952, -74.460703],
            [-34.850406, -34.082082],
          ]}
        />
        {this.state.searchFilters.length === 1 &&
        	<FilterControl
        		txt={`Retornar à visão geral`}
        		clickHandler={this.backFilter}
        	/>
        }
        {this.state.searchFilters.length === 2 &&
        	<FilterControl
        		txt={`Retornar à região ${this.state.searchFilters[0]}`}
        		clickHandler={this.backFilter}
        	/>
        }
        { this.renderMarkers() }
      </MapContainer>
    );
  }
  
  /* Retorna código JSX para renderizar os Markers e Popups de
  acordo com os filtros de busca atuais. */
  renderMarkers() {
  	const currentFilters = this.state.searchFilters;
  	
  	switch(currentFilters.length) {
  		// Nível 0: regiões
  		case 0:
  		  return (Object.entries(filters).map(([key, val]) => (
  		  	<Marker
  		  	  position={[val.lat, val.long]}
  		  	  key={key}
  		  	  title={key}
  		  	  keyboard={false}
              icon={this.getDivIcon(val['qtd_ies'], key, 'região', [val.lat, val.long])}
  		  	>
  		  	</Marker>
  		  )));
  		
  		// Nível 1: estados
  		case 1:
  		  const regiao = currentFilters[0];
  		  return (Object.entries(filters[regiao]['estados']).map(
  		  ([key, val]) => (
  		  	<Marker
  		  	  position={[val.lat, val.long]}
  		  	  key={key}
  		  	  title={key}
  		  	  keyboard={false}
              icon={this.getDivIcon(val['qtd_ies'], key, 'estado', [val.lat, val.long])}
  		  	>
  		  	</Marker>
  		  )));
  			
  		// Nível 2: IES
  		case 2:  		  
  		  if (this.censo.length <= 0)
  		  	return '';
  		  
          return (
          <MarkerClusterGroup>
          {this.censo.map((ies) => (
            <Marker
              position={[ies.lat, ies.long]}
              alt={ies["NO_IES"]}
              key={ies["_id"]}
              keyboard={true}
              icon={this.icon}
              eventHandlers={{
                popupopen: this.handlePopupOpen,
                popupclose: this.handlePopupClose,
              }}
            >
              <Popup
               ref={this.popupRef}
               maxHeight={400}
              >
                <div>
                  <h2>{ies["NO_IES"]}</h2>
                  <p tabIndex="0">Endereço: {ies["end_completo_y"]}</p>
                  <p tabIndex="0">
                    Quantidade de livros eletrônicos:{" "}
                    {ies["QT_LIVRO_ELETRONICO"]}
                  </p>
                  <p tabIndex="0">
                    Quantidade de periódicos eletrônicos:{" "}
                    {ies["QT_PERIODICO_ELETRONICO"]}
                  </p>
                  <p tabIndex="0">
                    Tem acesso ao portal Capes de periódicos?{" "}
                    {ies["IN_ACESSO_PORTAL_CAPES"] === "0" ? "Não" : "Sim"}
                  </p>
                  <p tabIndex="0">
                    Tem acesso a outras bases de dados licenciadas ou compradas?{" "}
                    {ies["IN_ACESSO_OUTRAS_BASES"] === "0" ? "Não" : "Sim"}
                  </p>
                  <p tabIndex="0">
                    Assina outras bases de dados licenciadas ou compradas?{" "}
                    {ies["IN_ASSINA_OUTRA_BASE"] === "0" ? "Não" : "Sim"}
                  </p>
                  <p tabIndex="0">
                    Tem catálogo online?{" "}
                    {ies["IN_CATALOGO_ONLINE"] === "0" ? "Não" : "Sim"}
                  </p>
                  <p tabIndex="0">
                    Oferece serviços pela internet?{" "}
                    {ies["IN_SERVICO_INTERNET"] === "0" ? "Não" : "Sim"}
                  </p>
                  <p tabIndex="0">
                    Busca integrada?{" "}
                    {ies["IN_BUSCA_INTEGRADA"] === "0" ? "Não" : "Sim"}
                  </p>
                  <p tabIndex="0">
                    Biblioteca participa de redes sociais?{" "}
                    {ies["IN_PARTICIPA_REDE_SOCIAL"] === "0" ? "Não" : "Sim"}
                  </p>
                  <p tabIndex="0">
                    (Informações do censo de {ies["NU_ANO_CENSO"]})
                  </p>
                  <ButtonGroup orientation="vertical">
                    <Button
                     variant="contained"
                     href={`/pagina-ies/${ies["CO_IES"]}`}
                     sx={{
                     	'& a': {
                     		color: "#fff",
                     	},
                     }}                     
                    >
                      Ver cadastro da instituição
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        this.closeCurrentPopup();
                      }}
                    >
                      Fechar
                    </Button>
                  </ButtonGroup>
                </div>
              </Popup>
            </Marker>
          ))}
          </MarkerClusterGroup>
          );
  		
  		default:
  			return '';
  	}
  }
}
