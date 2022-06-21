/* Componente do mapa em si. */

// Componentes importados
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import FilterControl from '../FilterControl';
import MarkerClusterGroup from '../MarkerClusterGroup';
import { DirecoesDialog } from '../DirecoesDialog';

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
const INITIAL_CENTER = [-14.235, -51.9253];
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
    this.controlRef = React.createRef();
    this.direcoesRef = React.createRef();

    // Binds necessários para reter o escopo da classe
    this.handlePopupOpen = this.handlePopupOpen.bind(this);
    this.handlePopupClose = this.handlePopupClose.bind(this);
    this.backFilter = this.backFilter.bind(this);
    this.focusOnMarker = this.focusOnMarker.bind(this);
    this.focusOnContainer = this.focusOnContainer.bind(this);
    this.closeDirecoes = this.closeDirecoes.bind(this);
    
    // Indica se o controle de atribuição foi adicionado ao mapa
    this.attributionAdded = false;
    
    // Indica se a tecla Shift está pressionada
    this.shiftDown = false;
    
    // Objeto com registros de IES obtidos no banco de dados
    this.censo = [];
    
    // Estado do mapa
    this.state = {
    	searchFilters: [],
    	resetView: this.resetView.bind(this),
    	direcoesOpen: false,
    	searchObj: {},
    	qtdIesDb: {}
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
    const closeBtn = e.popup._container.querySelector('.leaflet-popup-close-button');
    closeBtn.setAttribute("aria-label", "Fechar popup");   
    e.popup._container.tabIndex = "0";
    e.popup._container.focus();
    
    e.popup._container.onkeydown = (key) => {
      if (key.code === "Escape") {
        e.popup._closeButton.click();
      }
    };
    
    // Ocultar o controle de filtros para não atrapalhar a leitura
    this.controlRef.current.setState({hidden: true});
  }
  
  /* Abre o componente de direções */
  openDirecoes(address) {
  	this.direcoesRef.current.setState({toAddress: address});
  	this.setState({direcoesOpen: true});
  }
  
  /* Fecha o componente de direções */
  closeDirecoes() {
  	this.setState({direcoesOpen: false});
  }

  /* Devolve o foco ao Marker após fechar o Popup e recentraliza
  o mapa. */
  handlePopupClose(e) {
  	// Re-exibir controle de filtros
    this.controlRef.current.setState({hidden: false});
    
  	if(!e.popup._source._icon)
  		return null;
    e.popup._source._icon.focus();
    e.popup._source._map.panTo(this.previousCenter);
    this.previousCenter = null;    
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
    divEl.setAttribute("aria-label", `${name} tem ${txt} instituições`);
    divEl.setAttribute("tabIndex", "0");
    let spanEl = L.DomUtil.create("span", "", divEl);
    spanEl.innerHTML = txt;
    
    // Adicionar listeners, caso haja elementos
    if (parseInt(txt) !== 0) {
    	divEl.addEventListener("mouseup", () => {
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
    }
    
    // Construir ícone com o elemento HTML
  	const icon = L.divIcon({
  		className: 'my-div-icon',
  		html: divEl
  	});
  	
  	return icon;
  }
  
  // Retorna à visão geral com o zoom inicial
  resetView() {
  	this.setState({searchFilters: []}, () => {
  		this.mapRef.current.setView(INITIAL_CENTER, DEFAULT_ZOOM);
  		this.updateControl();
  	});
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
  	this.setState({searchFilters: currentFilters}, () => {
  		this.retrieveQtdIes();
  		this.updateControl();
  		this.focusOnMarker();
  	});
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
  	
  	if(latLong)
  		this.mapRef.current.setView(latLong, ZOOM_LEVELS[type]);
  	else
  		this.mapRef.current.setZoom(ZOOM_LEVELS[type]);
  	
    currentFilters.push(name);
  	
    this.setState({searchFilters: currentFilters}, () => {
    	this.retrieveQtdIes();
    	this.updateControl();
    });
  }
  
  /* Obtém as IES situadas no estado especificado e as armazena em
  this.censo. */
  retrieveIesEstado(nomeEstado) {
    const currentFilters = this.state.searchFilters;
    if (currentFilters.length !== 2)
    	return null;
    const estadoObj = filters[currentFilters[0]]['estados'][nomeEstado];
    const searchObj = this.state.searchObj;
    
    // Caso 1: Não há opções de busca especificadas. Requisição GET
    if (Object.keys(searchObj).length === 0) {
  		return fetch(`/api/ies/estados/${estadoObj['CO_UF_IES']}`)
      		.then(res => res.json())
      		.then(jsonRes => {
      			this.censo = jsonRes;
      			this.setState(this.state); // Forçar atualização
      	});
    }
    
    // Caso 1: Há opções de busca especificadas. Requisição POST
    searchObj['NO_UF_IES'] = nomeEstado;
    const options = {
  		method: 'POST',
  		headers: {
  			'Content-Type': 'application/json'
    	},
    	body: JSON.stringify(searchObj)
  	};
  	
  	return fetch('/api/ies', options)
      .then(res => res.json())
      .then(jsonRes => {
      	this.censo = jsonRes;
      	this.setState(this.state); // Forçar atualização
      });
  }
  
  /* Obtém a quantidade de IES das regiões ou estados exibidos
  no momento do BD. */
  retrieveQtdIes() {
  	const searchObj = this.state.searchObj;
  	const qtdIes = this.state.qtdIesDb;
  	const searchFilters = this.state.searchFilters;
  	
  	// Objeto iterativo contendo as regiões ou estados
  	let iter = {};
  	
  	// Campo correspondente à unidade (região ou estado)
  	let field = '';
  	
  	// Remover parâmetros de estado/região
  	if ('NO_REGIAO_IES' in searchObj)
  		delete searchObj['NO_REGIAO_IES'];
  	if ('NO_UF_IES' in searchObj)
  		delete searchObj['NO_UF_IES'];
  	
  	// Mapa está no nível de estado; chamar retrieveIesEstado e sair
  	if (searchFilters.length === 2)
  		return this.retrieveIesEstado(searchFilters[1]);
  	
  	// Não há opções de busca; não fazer nada
  	if (Object.keys(searchObj).length === 0)
  		return null;
  	
  	switch (searchFilters.length) {
  		case 0:
  			iter = Object.keys(filters);
  			field = 'NO_REGIAO_IES';
  			break;
  		case 1:
  			const regiao = searchFilters[0];
  			iter = Object.keys(filters[regiao]['estados']);
  			field = 'NO_UF_IES';
  			searchObj['NO_REGIAO_IES'] = regiao;
  			break;
  		default:
  			return null;
  	}
  	
  	let options = {};
  	for (const key of iter) {
  		searchObj[field] = key;
  		
  		options = {
  			method: 'POST',
  			headers: {
  				'Content-Type': 'application/json'
    		},
    		body: JSON.stringify(searchObj)
  		};
  		
  		fetch('/api/ies/qtd-ies', options)
      		.then(res => res.json())
      		.then(jsonRes => {
      			qtdIes[key] = jsonRes['qtd'];
      			this.setState({qtdIesDb: qtdIes});
      	});
  	}
  }
  
  // Atualiza o controle de filtros
  updateControl() {
  	if (this.controlRef.current) {
  		this.controlRef.current.setState({searchFilters: this.state.searchFilters})
  	}
  }
  
  // Adiciona um controle de atribuição ao mapa
  addMapAttribution() {
  	if (!this.mapRef.current)
  		return null;
  	
  	let attribution = new L.Control.Attribution({prefix: false});
  	attribution.addAttribution('<a aria-hidden="true" tabindex="-1" href="https://leafletjs.com/">Leaflet</a> | &copy; <a aria-hidden="true" tabindex="-1" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; <a aria-hidden="true" tabindex="-1" href="https://www.mapbox.com/about/maps/">Mapbox</a> | <a aria-hidden="true" tabindex="-1" target="_blank" href="https://www.mapbox.com/map-feedback/"><strong>Improve this map</strong></a>');
  	this.mapRef.current.addControl(attribution);
  	this.attributionAdded = true;
  }
  
  // Adiciona listeners ao mapa
  addMapListeners() {
  	if (!this.mapRef.current)
  		return null;
  		
  	const container = this.mapRef.current._container;
  	
  	// Dar foco ao controle caso Shift + Tab seja acionado
  	// sobre o primeiro marcador
  		
  	container.addEventListener("keydown", (e) => {
  		// Ignorar eventos especiais de clique na visão geral
  		if(this.state.searchFilters.length === 0)
  			return null;
  		
  		const firstMarker = container.querySelector('.leaflet-marker-pane').firstChild;
  		const lastMarker = container.querySelector('.leaflet-marker-pane').lastChild;
  		const control = this.controlRef.current;
  		let markerEl = e.target.offsetParent;
  		if (markerEl.classList.contains('leaflet-pane'))
  			markerEl = e.target;
  			
  		if (e.key === 'Shift')
  			this.shiftDown = true;
  		
  		// Shift-Tab no primeiro marcador: Focar de volta no controle
  		if (e.key === 'Tab' && this.shiftDown) {
  			if (markerEl === firstMarker) {
  				this.focusOnControl();
  				e.preventDefault();
  			}
  		}
  		
  		if (e.key === 'Tab' && !this.shiftDown) {
  			// Tab no último marcador: Acionar flag para evitar
  			// "loop infinito" de navegação
  			if (markerEl === lastMarker) {
  				control.setState({fromLastMarker: true});
  				e.preventDefault();
  			}
  			
  			// Tab no container do mapa: Focar no controle
  			else if (markerEl.tagName === 'BODY') {
  				this.focusOnControl();
  				e.preventDefault();
  			}
  		}
  	});
  	
  	container.addEventListener("keyup", (e) => {
  		if (e.key === 'Shift')
  			this.shiftDown = false;
  	});
  }
  
  // Retorna foco ao primeiro Marker do mapa
  focusOnMarker() {
  	const container = this.mapRef.current._container;
  	let firstMarker = container.querySelector('.leaflet-marker-pane').firstChild;
  	if (firstMarker.classList.contains('leaflet-marker-icon') && !firstMarker.getAttribute('role'))
  		firstMarker = firstMarker.firstChild;
  	firstMarker.focus();
  }
  
  // Retorna foco ao controle de filtros, caso haja
  focusOnControl() {
  	const control = this.controlRef.current;
  	if (control) {
  		control.setState(control.state);
  	}
  }
  
  // Dar foco ao container do mapa
  focusOnContainer() {
  	const container = this.mapRef.current._container;
  	container.focus();
  }
  
  render() {
  	if(!this.attributionAdded && this.mapRef) {
  		this.addMapListeners();
  		this.addMapAttribution();
  	}
  		
    return (
      <MapContainer
        center={INITIAL_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
        ref={this.mapRef}
      >
      	<a
      	 href="http://mapbox.com/about/maps"
      	 className='mapbox-logo'
      	 target="_blank"
      	 rel="noreferrer"
      	>
      	 	Mapbox
      	</a>
        <TileLayer
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
        <FilterControl
        	clickHandler={this.backFilter}
        	ref={this.controlRef}
        	focusOnMarker={this.focusOnMarker}
        	focusOnContainer={this.focusOnContainer}
        />
        <DirecoesDialog
         open={this.state.direcoesOpen}
         onClose={this.closeDirecoes}
         ref={this.direcoesRef}
        />
        { this.renderMarkers() }
      </MapContainer>
    );
  }
  
  /* Retorna código JSX para renderizar os Markers e Popups de
  acordo com os filtros de busca atuais. */
  renderMarkers() {
  	const currentFilters = this.state.searchFilters;
  	const searchDb = Object.keys(this.state.searchObj).length > 0;
  	const qtdIesDb = searchDb ? this.state.qtdIesDb : {};
  	
  	switch(currentFilters.length) {
  		// Nível 0: regiões
  		case 0:  		  
  		  return (Object.entries(filters).map(([key, val]) => (
  		  	<Marker
  		  	  position={[val.lat, val.long]}
  		  	  key={key}
  		  	  title={key}
  		  	  keyboard={false}
              icon={this.getDivIcon(qtdIesDb[key] !== undefined ? qtdIesDb[key] : val['qtd_ies'], key, 'região', [val.lat, val.long])}
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
              icon={this.getDivIcon(qtdIesDb[key] !== undefined ? qtdIesDb[key] : val['qtd_ies'], key, 'estado', [val.lat, val.long])}
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
                      color="success"
                      onClick={() => {
                        this.openDirecoes(ies["end_completo_y"]);
                      }}
                    >
                    	Obter direções
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
