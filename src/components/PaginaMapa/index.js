/* Componente que agrupa o mapa, o menu do mapa e demais componentes
em uma página. */

import React from 'react';
import { Mapa } from '../Mapa';
import { MenuMapa } from '../MenuMapa';

export class PaginaMapa extends React.Component {
	constructor() {
		super();
		this.changeZoom = this.changeZoom.bind(this);
		this.changeContrast = this.changeContrast.bind(this);
		this.changeBrightness = this.changeBrightness.bind(this);
		this.changeColorScheme = this.changeColorScheme.bind(this);
		this.updateMap = this.updateMap.bind(this);
		
		this.state = {
			contrast: 100,
			brightness: 100,
			grayscale: 0,
			mapRef: null
		};
	}

	render() {
		return (
			<div>
				<MenuMapa
					changeZoom={this.changeZoom}
					changeContrast={this.changeContrast}
					changeBrightness={this.changeBrightness}
					changeColorScheme={this.changeColorScheme}
				/>
				<Mapa
					updateMap={this.updateMap}
				/>
			</div>
		);
	}
	
	/* Aumenta ou diminui zoom em uma unidade. Se increase = true,
	aumentar; se increase = false, diminuir. */
  	changeZoom(increase) {
  		if (increase) {
  			this.state.mapRef.current.zoomIn(1);
  		}
  		else if (!increase) {
  			this.state.mapRef.current.zoomOut(1);
  		}
  	}
  	
  	/* Aumenta ou diminui o contraste em 10%. Se increase = true,
  	aumentar; se increase = false, diminuir. */
  	changeContrast(increase) {
  		let newContrast = this.state.contrast;
  		if (increase) {
  			newContrast += 10;
  		}
  		else if (!increase) {
  			newContrast -= 10;
  		}
  		
  		this.setState({contrast: newContrast}, this.applyFilters);
  	}
  	
  	/* Aumenta ou diminui o brilho em 10%. Se increase = true,
  	aumentar; se increase = false, diminuir. */
  	changeBrightness(increase) {
  		let newBrightness = this.state.brightness;
  		if (increase) {
  			newBrightness += 10;
  		}
  		else if (!increase) {
  			newBrightness -= 10;
  		}
  		
  		this.setState({brightness: newBrightness}, this.applyFilters);
  	}
  	
  	/* Altera o esquema de cores de acordo com o parâmetro de entrada.
  	scheme: aceita os valores "normal" e "preto-e-branco". */
  	changeColorScheme(scheme) {
  		switch(scheme) {
  			case 'padrão':
  				this.setState({grayscale: 0}, this.applyFilters);
  				break;
  			case 'preto-e-branco':
  				this.setState({grayscale: 100}, this.applyFilters);
  				break;
  			default:
  				throw new Error('Esquema de cores não definido');
  		}
  	}
  	
  	/* Atualiza os objetos de referência ao mapa */
  	updateMap(newMap) {
  		this.setState({
  			mapRef: newMap
  		});
  	}
  	
  	/* Aplica os filtros atuais ao mapa. */
  	applyFilters() {
  		const contrast = this.state.contrast;
  		const brightness = this.state.brightness;
  		const grayscale = this.state.grayscale;
  		let filteredMap = this.state.mapRef;
  		
  		filteredMap.current._container.style.filter =
  		 `contrast(${contrast}%) brightness(${brightness}%) grayscale(${grayscale}%)`;
  		this.setState({mapRef: filteredMap});
  	}
};
