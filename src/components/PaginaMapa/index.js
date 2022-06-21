/* Componente que agrupa o mapa, o menu do mapa e demais componentes
em uma página. */

import React from "react";
import Fab from '@mui/material/Fab';
import HelpIcon from '@mui/icons-material/Help';
import { Mapa } from "../Mapa";
import { MenuMapa } from "../MenuMapa";
import { MenuBusca } from "../MenuBusca";
import { TutorialDialog } from "../TutorialDialog";

export class PaginaMapa extends React.Component {
  constructor() {
    super();
    this.changeZoom = this.changeZoom.bind(this);
    this.changeContrast = this.changeContrast.bind(this);
    this.changeBrightness = this.changeBrightness.bind(this);
    this.changeColorScheme = this.changeColorScheme.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.openTutorial = this.openTutorial.bind(this);
	this.closeTutorial = this.closeTutorial.bind(this);
	this.handleSearch = this.handleSearch.bind(this);
    
    this.mapComponent = React.createRef();

	const visitedBefore = localStorage.getItem('visitedBefore');
    this.state = {
      contrast: 100,
      brightness: 100,
      grayscale: 0,
      openTutorial: visitedBefore ? false : true
    };
  }
  
  componentDidMount() {
  	localStorage.setItem('visitedBefore', true);
  }
  
  render() {
    return (
      <div>
      	<TutorialDialog
      	 open={this.state.openTutorial}
      	 onClose={this.closeTutorial}
      	/>
      	<Fab
      	 color="primary"
      	 aria-label="Ajuda"
      	 onClick={this.openTutorial}
      	 sx={{
      	 	position: "fixed",
      	 	right: 0
      	 }}
      	>
        	<HelpIcon />
      	</Fab>
      	<MenuBusca
      	  onSubmit={this.handleSearch}
      	/>
        <Mapa updateMap={this.updateMap} ref={this.mapComponent} />
        <MenuMapa
          changeZoom={this.changeZoom}
          changeContrast={this.changeContrast}
          changeBrightness={this.changeBrightness}
          changeColorScheme={this.changeColorScheme}
          resetFilters={this.resetFilters}
        />
      </div>
    );
  }
  
  openTutorial() {
  	this.setState({ openTutorial: true});
  }
  
  closeTutorial() {
  	this.setState({ openTutorial: false});
  }
  
  /* Acionado quando o usuário submete filtros de busca */
  handleSearch(searchData) {
  	this.mapComponent.current.setState(
  		{searchObj: searchData},
  		this.mapComponent.current.retrieveQtdIes
  	);
  }

  changeAttributes(attr, delta) {
    let newValue = null;
    switch (attr) {
      case "zoom":
        delta === "zoomin"
          ? this.state.mapRef.current.zoomIn(1)
          : this.state.mapRef.current.zoomOut(1);
        break;
      case "contrast":
        delta > 0 ? (newValue += delta) : (newValue += delta);
        this.setState({ contrast: newValue }, this.applyFilters);
        break;
      case "brightness":
        delta > 0 ? (newValue += delta) : (newValue += delta);
        this.setState({ brightness: newValue }, this.applyFilters);
        break;
      case "color":
        delta > 0
          ? this.setState({ grayscale: 0 }, this.applyFilters)
          : this.setState({ grayscale: 100 }, this.applyFilters);
        break;
      default:
        throw new Error("Indefinido");
    }
  }

  /* Aumenta ou diminui zoom em uma unidade. Se increase = true,
	aumentar; se increase = false, diminuir. */
  changeZoom(increase, reset) {
    increase
      ? this.state.mapRef.current.zoomIn(1)
      : this.state.mapRef.current.zoomOut(1);

	if (reset) {
    	this.mapComponent.current.state.resetView();
    }
  }

  /* Aumenta ou diminui o contraste em 10%. Se increase = true,
  	aumentar; se increase = false, diminuir. */
  changeContrast(delta) {
    let newContrast = this.state.contrast;

    delta > 0 ? (newContrast += delta) : (newContrast += delta);

    if (delta === 0) {
      newContrast = 100;
    }

    this.setState({ contrast: newContrast }, this.applyFilters);
  }

  /* Aumenta ou diminui o brilho 
  	Caso o índice de variação seja positivo, aplicá-lo diretamente
	  Caso negativo, usar `+=` para não inverter o sinal
	  Por fim, caso o índice seja 0, voltar aos valores iniciais do constructor

	  Esta função está idêntica a "changeContrast". Torná-la uma só
  */
  changeBrightness(delta) {
    let newBrightness = this.state.brightness;

    delta > 0 ? (newBrightness += delta) : (newBrightness += delta);

    if (delta === 0) {
      newBrightness = 100;
    }

    this.setState({ brightness: newBrightness }, this.applyFilters);
  }

  /* Altera o esquema de cores de acordo com o parâmetro de entrada.
  	scheme: aceita os valores "normal" e "escaladecinza". */
  changeColorScheme(scheme) {
    switch (scheme) {
      case "padrão":
        this.setState({ grayscale: 0 }, this.applyFilters);
        break;
      case "escaladecinza":
        this.setState({ grayscale: 100 }, this.applyFilters);
        break;
      default:
        throw new Error("Esquema de cores não definido");
    }
  }
  
  /* Reinicia os filtros aos valores iniciais. */
  resetFilters() {
  	this.setState({
  		contrast: 100,
      	brightness: 100,
      	grayscale: 0,
  	}, () => {
  		this.applyFilters(true);
  	});
  }

  /* Atualiza os objetos de referência ao mapa */
  updateMap(newMap) {
    this.setState({
      mapRef: newMap,
    });
  }

  /* Aplica os filtros atuais ao mapa.
  	resetView: Se verdadeiro, reinicia o mapa à sua localização e
  	zoom iniciais. */
  applyFilters(resetView) {
    const contrast = this.state.contrast;
    const brightness = this.state.brightness;
    const grayscale = this.state.grayscale;
    let filteredMap = this.state.mapRef;

    filteredMap.current._container.style.filter = `contrast(${contrast}%) brightness(${brightness}%) grayscale(${grayscale}%)`;
    this.setState({ mapRef: filteredMap }, () => {
    	if (resetView)
    		this.mapComponent.current.state.resetView();
    });
  }
}
