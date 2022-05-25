/* Componente de controle para retornar ao nível de filtro
anterior no mapa.
Baseado em: https://stackoverflow.com/a/68415125 */

import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

class FilterControl extends React.Component {
  createButtonControl() {
    const MapHelp = L.Control.extend({
      onAdd: (map) => {
        const helpDiv = L.DomUtil.create("button", "");
        this.helpDiv = helpDiv;
        
        const filters = this.props.filters;
        console.log(filters);
        switch (filters.length) {
        	case 2:
        		helpDiv.innerHTML = `Retornar à região ${filters[0]}`;
        		break;
        	case 1:
        		helpDiv.innerHTML = `Retornar`;
        		break;
        	default:
        		return null;
        }
        
        helpDiv.addEventListener("click", this.props.clickHandler);

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
    return null;
  }
}

function withMap(Component) {
  return function WrappedComponent(props) {
    const map = useMap();
    return <Component {...props} map={map} />;
  };
}

export default withMap(FilterControl);
