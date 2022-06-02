/* Componente de controle para retornar ao nível de filtro
anterior no mapa.
Baseado em: https://stackoverflow.com/a/68415125 */

import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

import "./style.css";

class FilterControl extends React.Component {

  constructor(props) {
    super(props);
    
  	this.state = {
  		searchFilters: []
  	};
  }

  createButtonControl() {
    const MapHelp = L.Control.extend({
      onAdd: (map) => {
        const helpDiv = L.DomUtil.create("button", "");
        this.helpDiv = helpDiv;
        helpDiv.addEventListener("click", this.props.clickHandler);
        helpDiv.hidden = true;
        return helpDiv;
      }
    });
    return new MapHelp({ position: "topleft" });
  }

  componentDidMount() {
    const { map } = this.props;
    const control = this.createButtonControl();
    control.addTo(map);
  }

  componentWillUnmount() {
    this.helpDiv.remove();
  }

  render() {
  	if(!this.helpDiv)
  		return null;
  	
  	const filters = this.state.searchFilters;
    let txt = "";
    let hidden = false;
    
    switch (filters.length) {
    	case 0:
    		hidden = true;
    		break;
    	case 1:
    		txt = "Retornar à visão geral";
    		break;
    	case 2:
    		txt = `Retornar à região ${filters[0]}`;
    		break;
    	default:
    		return null;
    }
    
    this.helpDiv.innerHTML = txt;
    this.helpDiv.hidden = hidden;
    this.helpDiv.ariaHidden = hidden;
    
    if (!hidden) {
    	this.helpDiv.setAttribute("tabindex", "0");
    	this.helpDiv.focus();
    }
    else {
    	this.helpDiv.setAttribute("tabindex", "-1");    	
    }
    	
    return null;
  }
}

// Wrapper para utilizar hooks e encaminhar ref à classe

const wrapper = React.forwardRef((props, ref) => {
	const map = useMap();
	return <FilterControl {...props} map={map} ref={ref} />;
});

export default wrapper;
