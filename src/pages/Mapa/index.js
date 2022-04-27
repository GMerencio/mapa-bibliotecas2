import React, {useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import './style.css';
import { censo } from './censo';

// Token de acesso do Mapbox
const TOKEN_MAPBOX = 'pk.eyJ1IjoiZ21lcmVuY2lvIiwiYSI6ImNsMjgyYTVxODA1OXUzZG56emppeHFkd2wifQ.5NMbrQod0tTYWB0CnqqEmA';

export const Mapa = () => {
  /* activeIes indica qual é a IES em que o usuário clicou para exibir
  um popup com suas informações no mapa. Caso não haja IES selecionada,
  esta variável é nula. */
  const [activeIes, setActiveIes] = useState(null);
  
  return (
  	<MapContainer center={[-14.2350, -51.9253]} zoom={4} scrollWheelZoom={false}>
  		<TileLayer
    		attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
    		url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${TOKEN_MAPBOX}`}
  		/>
  		
  		{
  			/* Inserir Markers no mapa baseados na latitude e
  			longitude das IES. Na prop eventHandlers, especificamos
  			uma função que bota a IES correspondente ao Marker como
  			activeIes. */
  			censo.map(ies => (
  				<Marker
  					position={[ies.lat, ies.long]}
  					eventHandlers={{click: () => setActiveIes(ies)}}
  				/>
  			))
  		}
  		
  		{
  			/* Caso haja uma activeIes (ou seja, um Marker tiver sido
  			clicado), inserir um popup com as informações da IES. Na
  			prop onClose, inserimos um valor nulo na activeIes. */
  			activeIes && (
  				<Popup
  					position={[activeIes.lat, activeIes.long]}
  					onClose={() => setActiveIes(null)}
  				>
  					<div>
  						<h2>{activeIes['NO_IES']}</h2>
  						<p>Endereço: {activeIes['end_completo_y']}</p>
  						<p>Quantidade de livros eletrônicos: {activeIes['QT_LIVRO_ELETRONICO']}</p>
  						<p>Quantidade de periódicos eletrônicos: {activeIes['QT_PERIODICO_ELETRONICO']}</p>
  						<p>(Informações do censo de {activeIes['NU_ANO_CENSO']})</p>
  					</div>
  				</Popup>
  			)
  		}
	</MapContainer>
  );
};
