/* Caixa de mensagem que pede a localização do usuário e o
redireciona ao Google Maps com direções do ponto de partida
a um local especificado. */

import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

export class DirecoesDialog extends React.Component {

  constructor(props) {
  	super(props);
  	
  	this.submit = this.submit.bind(this);
  	this.handleChange = this.handleChange.bind(this);
  	this.getAddress = this.getAddress.bind(this);
  	
  	this.state = {
  		fromAddress: '',
  		toAddress: ''
  	};
  	
  	this.textField = React.createRef();
  }
  
  handleChange(e) {
  	this.setState({fromAddress: e.target.value});
  }
  
  /* Obter a localização atual do usuário através das APIs Geolocation
  e Nominatim, atualizando o campo de texto com o resultado. */
  getAddress() {  	
  	navigator.geolocation.getCurrentPosition(
  	(pos) => {
  		const lat = pos.coords.latitude;
  		const lon = pos.coords.longitude;
  		
  		const options = {
  			headers: {
  				'Referer': 'https://mapa-bibliotecas.herokuapp.com/'
  			}
  		};
  		
  		fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`, options)
      	.then(res => res.json())
      	.then(jsonRes => {
      		const full = jsonRes['address'];
      		const address = `${full['road']}, ${full['suburb']}, ${full['city']}, ${full['postcode']}`;
      		this.setState({fromAddress: address});
      	});
  	},
  	(error) => {
  		this.setState({fromAddress: 'Falha ao tentar obter endereço'});
  	});  	
  }

  submit() {
  	const fromAddress = this.state.fromAddress;
  	const toAddress = this.state.toAddress;
  	window.open(`https://www.google.com/maps/dir/?api=1&origin=${fromAddress}&destination=${toAddress}`);
  }

  render() {
  	const open = this.props.open;
  	const onClose = this.props.onClose;
  	
    return (
    	<Dialog
    	 onClose={onClose}
    	 open={open}
    	 aria-labelledby="localizacao-title">
    		<DialogTitle id="localizacao-title">
    			Insira o endereço de partida ou permita o preenchimento
    			automático da sua localização atual.
    		</DialogTitle>
    		
    		<DialogContent>
    			<TextField
            	 margin="dense"
            	 id="address-input"
            	 label="Endereço"
            	 type="text"
            	 fullWidth
            	 variant="standard"
            	 value={this.state.fromAddress}
            	 onChange={this.handleChange}
          		/>
    		</DialogContent>
    		
    		<DialogActions>
    			<Button onClick={this.getAddress}>Obter localização atual</Button>
    			<Button onClick={this.submit}>Confirmar</Button>
    			<Button onClick={onClose}>Fechar</Button>
    		</DialogActions>
    	</Dialog>
    );
  }
}
