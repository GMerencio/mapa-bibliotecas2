/* Componente do mapa em si. */

// Componentes importados
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

// CSS, dados e scripts
import './style.css';
import { censo } from './censo';

// Imagens
import markerIcon from './marker-icon.png';
import markerShadow from './marker-shadow.png';
import markerIcon2x from './marker-icon-2x.png';

// Token de acesso do Mapbox
const TOKEN_MAPBOX = 'pk.eyJ1IjoiZ21lcmVuY2lvIiwiYSI6ImNsMjgyYTVxODA1OXUzZG56emppeHFkd2wifQ.5NMbrQod0tTYWB0CnqqEmA';

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
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize:  [41, 41]
  	});
  	
  	// Objetos de referência ao mapa e seus elementos
  	this.mapRef = React.createRef();
  	this.popupRef = React.createRef();
  }
  
  // Fecha popup aberto no momento
  closeCurrentPopup() {
  	this.popupRef.current._closeButton.click();
  }
  
  componentDidMount() {
  	this.props.updateMap(this.mapRef, this.markerRef);
  }

  render() {
  	return (
  	  <MapContainer
  	   center={[-14.2350, -51.9253]}
  	   zoom={DEFAULT_ZOOM}
  	   scrollWheelZoom={true}
  	   zoomControl={false}
  	   ref={this.mapRef}>
  		<TileLayer
    		attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
    		url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${TOKEN_MAPBOX}`}
    		tileSize={512}
    		zoomOffset={-1}
    		minZoom={DEFAULT_ZOOM}
    		maxZoom={MAX_ZOOM}
    		bounds={[[5.404952, -74.460703], [-34.850406, -34.082082]]}
  		/>  		
  		{
  			/* Inserir Markers e Popups no mapa baseado
  			na latitude e longitude das IES. */
  			censo.map(ies => (
  				<Marker
  					position={[ies.lat, ies.long]}
  					alt={ies['NO_IES']}
  					keyboard={true}
  					icon={this.icon}
  				>
  					<Popup
  					 ref={this.popupRef}
  					 position={[ies.lat, ies.long]}
  					 maxHeight={400}>
  						<div>
  							<h2>{ies['NO_IES']}</h2>
  							<p>Endereço: {ies['end_completo_y']}</p>
  							<p>Quantidade de livros eletrônicos: {ies['QT_LIVRO_ELETRONICO']}</p>
  							<p>Quantidade de periódicos eletrônicos: {ies['QT_PERIODICO_ELETRONICO']}</p>
  							<p>Tem acesso ao portal Capes de periódicos? {ies['IN_ACESSO_PORTAL_CAPES'] === '0'? 'Não' : 'Sim'}</p>
  							<p>Tem acesso a outras bases de dados licenciadas ou compradas? {ies['IN_ACESSO_OUTRAS_BASES'] === '0'? 'Não' : 'Sim'}</p>
  							<p>Assina outras bases de dados licenciadas ou compradas? {ies['IN_ASSINA_OUTRA_BASE'] === '0'? 'Não' : 'Sim'}</p>
  							<p>Tem catálogo online? {ies['IN_CATALOGO_ONLINE'] === '0'? 'Não' : 'Sim'}</p>
  							<p>Oferece serviços pela internet? {ies['IN_SERVICO_INTERNET'] === '0'? 'Não' : 'Sim'}</p>
  							<p>Busca integrada? {ies['IN_BUSCA_INTEGRADA'] === '0'? 'Não' : 'Sim'}</p>
  							<p>Biblioteca participa de redes sociais? {ies['IN_PARTICIPA_REDE_SOCIAL'] === '0'? 'Não' : 'Sim'}</p>
  							<p>(Informações do censo de {ies['NU_ANO_CENSO']})</p>
  							<ButtonGroup orientation="vertical">
  								<Button variant="contained">Ver cadastro da instituição</Button>
  								<Button variant="contained" color="error" onClick={() => { this.closeCurrentPopup(); }}>Fechar</Button>
  							</ButtonGroup>
  						</div>
  					</Popup>
  				</Marker>
  			))
  		}
	  </MapContainer>
    );
  }
};