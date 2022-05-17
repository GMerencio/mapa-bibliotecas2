/* Componente do mapa em si. */

// Componentes importados
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

// CSS, dados e scripts
import "./style.css";
import { censo } from "./censo";

// Imagens
import markerIcon from "./marker-icon.png";
import markerShadow from "./marker-shadow.png";
import markerIcon2x from "./marker-icon-2x.png";

// Token de acesso do Mapbox
// depois, por questões de segurança, passar este token para um arquivo de ambiente (.env)
const TOKEN_MAPBOX =
  "pk.eyJ1IjoiZ21lcmVuY2lvIiwiYSI6ImNsMjgyYTVxODA1OXUzZG56emppeHFkd2wifQ.5NMbrQod0tTYWB0CnqqEmA";

// Variáveis de configuração
const DEFAULT_ZOOM = 4;
const MAX_ZOOM = 14;

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
        
    // Restaurar estado do mapa da session storage, caso haja
    const prevState = window.sessionStorage.getItem('state');
    this.state = JSON.parse(prevState) || {
    	center: null,
    	zoom: null
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

  mapLoaded(e) {
  	// Restaurar o estado do mapa, caso a informação tenha sido salva
  	if (this.state.center && this.state.zoom)
  		e.target.setView(JSON.parse(this.state.center), this.state.zoom);
  }
  
  // Salva o estado do mapa em session storage
  saveToSessionStorage() {
  	const current = this.mapRef.current;
  	
  	if(current) {
  		const newState = {
  			center: JSON.stringify(current.getCenter()),
  			zoom: current.getZoom()
  		}
  		window.sessionStorage.setItem('state', JSON.stringify(newState));
  	}
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
        
        {
          /* Inserir Markers e Popups no mapa baseado
  			na latitude e longitude das IES. */
          censo.map((ies) => (
            <Marker
              position={[ies.lat, ies.long]}
              alt={ies["NO_IES"]}
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
				  {/* tabindex para obter foco */}
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
                     href={`/ies/${ies["NO_IES"]}`}
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
          ))
        }
      </MapContainer>
    );
  }
}
