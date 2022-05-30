/* Componente de controle para retornar ao nível de filtro
anterior no mapa.
Baseado em: https://stackoverflow.com/a/68415125 */

import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

import "./style.css";

class FilterControl extends React.Component {

  createButtonControl() {
    const MapHelp = L.Control.extend({
      onAdd: (map) => {
        const helpDiv = L.DomUtil.create("button", "");
        this.helpDiv = helpDiv;
        helpDiv.innerHTML = this.props.txt;
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
    this.helpDiv.focus();
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
