import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import './style.css';
import { censo } from './censo';

// Token de acesso do Mapbox
const TOKEN_MAPBOX = 'pk.eyJ1IjoiZ21lcmVuY2lvIiwiYSI6ImNsMjgyYTVxODA1OXUzZG56emppeHFkd2wifQ.5NMbrQod0tTYWB0CnqqEmA';

export const Mapa = () => {  
  return (	
  	<MapContainer center={[-14.2350, -51.9253]} zoom={4} scrollWheelZoom={false}>
  		<TileLayer
    		attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
    		url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${TOKEN_MAPBOX}`}
  		/>
  		
  		<Popup position={[-8.5, -63.2]}>
  			<div>
  				<p>Texto de teste para o plugin de Libras.</p>
  			</div>
  		</Popup>
  		
  		{
  			/* Inserir Markers e Popups no mapa baseado
  			na latitude e longitude das IES. */
  			censo.map(ies => (
  				<Marker
  					position={[ies.lat, ies.long]}
  					alt={ies['NO_IES']}
  					keyboard={true}
  				>
  					<Popup position={[ies.lat, ies.long]}>
  						<div>
  							<h2>{ies['NO_IES']}</h2>
  							<p>Endereço: {ies['end_completo_y']}</p>
  							<p>Quantidade de livros eletrônicos: {ies['QT_LIVRO_ELETRONICO']}</p>
  							<p>Quantidade de periódicos eletrônicos: {ies['QT_PERIODICO_ELETRONICO']}</p>
  							<p>(Informações do censo de {ies['NU_ANO_CENSO']})</p>
  						</div>
  					</Popup>
  				</Marker>
  			))
  		}
	</MapContainer>
  );
};
