/* Menu com opções de busca no mapa através de filtros. */

import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const ORG_ACADEMICA = {
	'1': 'Universidade',
	'2': 'Centro Universitário',
	'3': 'Faculdade',
	'4': 'Instituto Federal de Educação, Ciência e Tecnologia',
	'5': 'Centro Federal de Educação Tecnológica'
};

const CATEGORIA_ADMIN = {
	'1': 'Pública Federal',
	'2': 'Pública Estadual',
	'3': 'Pública Municipal',
	'4': 'Privada com fins lucrativos',
	'5': 'Privada sem fins lucrativos',
	'6': 'Privada - Particular em sentido estrito',
	'7': 'Especial',
	'8': 'Privada comunitária',
	'9': 'Privada confessional'
};

export class MenuBusca extends React.Component {

  constructor(props) {
  	super(props);
  	
  	this.initialState = {
  		IN_ACESSO_PORTAL_CAPES: '',
  		IN_ACESSO_OUTRAS_BASES: '',
  		IN_ASSINA_OUTRA_BASE: '',
  		IN_CATALOGO_ONLINE: '',
  		IN_SERVICO_INTERNET: '',
  		IN_BUSCA_INTEGRADA: '',
  		IN_PARTICIPA_REDE_SOCIAL: '',
  		TP_ORGANIZACAO_ACADEMICA: [],
  		TP_CATEGORIA_ADMINISTRATIVA: [],
  		drawerOpen: false
  	};
  	
  	this.state = structuredClone(this.initialState);
  	  	
  	this.openDrawer = this.openDrawer.bind(this);
  	this.closeDrawer = this.closeDrawer.bind(this);
  	this.handleChange = this.handleChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  	this.clearSearch = this.clearSearch.bind(this);
  }
  
  openDrawer() {
  	this.setState({drawerOpen: true});
  }
  
  closeDrawer() {
  	this.setState({drawerOpen: false});
  }
  
  handleChange(e) {
  	const target = e.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });
  }
  
  handleSubmit() {
  	let searchObj = structuredClone(this.state);
  	
  	for (const key in this.state) {
  		if (this.state[key].length === 0) {
  			delete searchObj[key];
  			continue;
  		}
  		
  		if (key === 'TP_ORGANIZACAO_ACADEMICA' || key === 'TP_CATEGORIA_ADMINISTRATIVA') {
  			const inObj = {
  				$in: this.state[key]
  			};
  			searchObj[key] = inObj;
  		}
  	}
  	
  	if ('drawerOpen' in searchObj)
  		delete searchObj['drawerOpen'];
  	
  	this.props.onSubmit(searchObj);
  	this.closeDrawer();
  }
  
  clearSearch() {
  	let newState = structuredClone(this.initialState);
  	newState.drawerOpen = true;
  	this.setState(newState);
  }
  
  render() {
  	return (
  		<Box
  		 component="section"
  		 sx={{
  		 	textAlign: 'center',
  		 }}
  		>
  			<Button
  			 variant="contained"
  			 color="primary"
  			 onClick={this.openDrawer}
  			>
  				Opções de busca
  			</Button>
  			
  			<Button
  			 variant="contained"
  			 color="error"
  			 onClick={() => {
  			 	this.props.onSubmit({});
  			 }}
  			 sx={{
  			 	marginLeft: '1rem',
  			 }}
  			>
  				Limpar busca
  			</Button>
  			
  			<Drawer
  			 open={this.state.drawerOpen}
  			 onClose={this.closeDrawer}
  			 sx={{
  			 	'& .MuiDrawer-paper': {
  			 		padding: '1rem',
  			 		width: '50vw',
  			 	},
  			 }}
  			>
  				{this.drawerContent()}
  			</Drawer>
  		</Box>
  	);
  }

  drawerContent() {
    return (
    	  <Stack
    	   direction="column"
    	   spacing={2}
    	  >
    	      <FormControl fullWidth={true}>
    	      	<InputLabel id="IN_ACESSO_PORTAL_CAPES-label">
    	      		Acesso ao portal CAPES
    	      	</InputLabel>
  			  	<Select
    				labelId="IN_ACESSO_PORTAL_CAPES-label"
    				id="IN_ACESSO_PORTAL_CAPES"
    				name="IN_ACESSO_PORTAL_CAPES"
    				value={this.state.IN_ACESSO_PORTAL_CAPES}
    				label="Acesso ao portal CAPES"
    				onChange={this.handleChange}
  			  	>
    				<MenuItem value={''}><em>Vazio</em></MenuItem>
    				<MenuItem value={"1"}>Sim</MenuItem>
    				<MenuItem value={"0"}>Não</MenuItem>
  			  	</Select>
  			  </FormControl>
    	    
    	      <FormControl fullWidth>
    	      	<InputLabel id="IN_ACESSO_OUTRAS_BASES-label">
    	      		Acesso a outras bases
    	      	</InputLabel>
  			  	<Select
    				labelId="IN_ACESSO_OUTRAS_BASES-label"
    				id="IN_ACESSO_OUTRAS_BASES"
    				name="IN_ACESSO_OUTRAS_BASES"
    				value={this.state.IN_ACESSO_OUTRAS_BASES}
    				label="Acesso a outras bases"
    				onChange={this.handleChange}
  			  	>
    				<MenuItem value={''}><em>Vazio</em></MenuItem>
    				<MenuItem value={"1"}>Sim</MenuItem>
    				<MenuItem value={"0"}>Não</MenuItem>
  			  	</Select>
  			  </FormControl>
  			  
  			  <FormControl fullWidth>
    	      	<InputLabel id="IN_ASSINA_OUTRA_BASE-label">
    	      		Assina outras bases
    	      	</InputLabel>
  			  	<Select
    				labelId="IN_ASSINA_OUTRA_BASE-label"
    				id="IN_ASSINA_OUTRA_BASE"
    				name="IN_ASSINA_OUTRA_BASE"
    				value={this.state.IN_ASSINA_OUTRA_BASE}
    				label="Assina outras bases"
    				onChange={this.handleChange}
  			  	>
    				<MenuItem value={''}><em>Vazio</em></MenuItem>
    				<MenuItem value={"1"}>Sim</MenuItem>
    				<MenuItem value={"0"}>Não</MenuItem>
  			  	</Select>
  			  </FormControl>
  			  
  			  <FormControl fullWidth>
    	      	<InputLabel id="IN_CATALOGO_ONLINE-label">
    	      		Tem catálogo online
    	      	</InputLabel>
  			  	<Select
    				labelId="IN_CATALOGO_ONLINE-label"
    				id="IN_CATALOGO_ONLINE"
    				name="IN_CATALOGO_ONLINE"
    				value={this.state.IN_CATALOGO_ONLINE}
    				label="Tem catálogo online"
    				onChange={this.handleChange}
  			  	>
    				<MenuItem value={''}><em>Vazio</em></MenuItem>
    				<MenuItem value={"1"}>Sim</MenuItem>
    				<MenuItem value={"0"}>Não</MenuItem>
  			  	</Select>
  			  </FormControl>
  			  
  			  <FormControl fullWidth>
    	      	<InputLabel id="IN_BUSCA_INTEGRADA-label">
    	      		Tem busca integrada
    	      	</InputLabel>
  			  	<Select
    				labelId="IN_BUSCA_INTEGRADA-label"
    				id="IN_BUSCA_INTEGRADA"
    				name="IN_BUSCA_INTEGRADA"
    				value={this.state.IN_BUSCA_INTEGRADA}
    				label="Tem busca integrada"
    				onChange={this.handleChange}
  			  	>
    				<MenuItem value={''}><em>Vazio</em></MenuItem>
    				<MenuItem value={"1"}>Sim</MenuItem>
    				<MenuItem value={"0"}>Não</MenuItem>
  			  	</Select>
  			  </FormControl>
  			  
  			  <FormControl fullWidth={true}>
    	      	<InputLabel id="IN_SERVICO_INTERNET-label">
    	      		Oferece serviços pela internet
    	      	</InputLabel>
  			  	<Select
    				labelId="IN_SERVICO_INTERNET-label"
    				id="IN_SERVICO_INTERNET"
    				name="IN_SERVICO_INTERNET"
    				value={this.state.IN_SERVICO_INTERNET}
    				label="Oferece serviços pela internet"
    				onChange={this.handleChange}
  			  	>
    				<MenuItem value={''}><em>Vazio</em></MenuItem>
    				<MenuItem value={"1"}>Sim</MenuItem>
    				<MenuItem value={"0"}>Não</MenuItem>
  			  	</Select>
  			  </FormControl>
  			  
  			  <FormControl fullWidth={true}>
    	      	<InputLabel id="IN_PARTICIPA_REDE_SOCIAL-label">
    	      		Participa de redes sociais
    	      	</InputLabel>
  			  	<Select
    				labelId="IN_PARTICIPA_REDE_SOCIAL-label"
    				id="IN_PARTICIPA_REDE_SOCIAL"
    				name="IN_PARTICIPA_REDE_SOCIAL"
    				value={this.state.IN_PARTICIPA_REDE_SOCIAL}
    				label="Participa de redes sociais"
    				onChange={this.handleChange}
  			  	>
    				<MenuItem value={''}><em>Vazio</em></MenuItem>
    				<MenuItem value={"1"}>Sim</MenuItem>
    				<MenuItem value={"0"}>Não</MenuItem>
  			  	</Select>
  			  </FormControl>
  			  
  			  <FormControl fullWidth={true}>
    	      	<InputLabel id="TP_ORGANIZACAO_ACADEMICA-label">
    	      		Organização Acadêmica
    	      	</InputLabel>
  			  	<Select
    				labelId="TP_ORGANIZACAO_ACADEMICA-label"
    				id="TP_ORGANIZACAO_ACADEMICA"
    				name="TP_ORGANIZACAO_ACADEMICA"
    				value={this.state.TP_ORGANIZACAO_ACADEMICA}
    				label="Organização Acadêmica"
    				onChange={this.handleChange}
    				multiple
    				renderValue={(selected) =>
    					selected.map((key) => ORG_ACADEMICA[key]).join(', ')
    				}
  			  	>
    				<MenuItem disabled value={''}><em>Vazio</em></MenuItem>
    				{Object.entries(ORG_ACADEMICA).map(
    					([key, value]) => (
    						<MenuItem
    						 key={key}
    						 value={key}
    						>
    							<Checkbox
    							 checked={this.state.TP_ORGANIZACAO_ACADEMICA.indexOf(key) > -1}
    							/>
    							<ListItemText primary={value} />
    						</MenuItem>
    					)
    				)}
  			  	</Select>
  			  </FormControl>
  			  
  			  <FormControl fullWidth={true}>
    	      	<InputLabel id="TP_CATEGORIA_ADMINISTRATIVA-label">
    	      		Categoria Administrativa
    	      	</InputLabel>
  			  	<Select
    				labelId="TP_CATEGORIA_ADMINISTRATIVA-label"
    				id="TP_CATEGORIA_ADMINISTRATIVA"
    				name="TP_CATEGORIA_ADMINISTRATIVA"
    				value={this.state.TP_CATEGORIA_ADMINISTRATIVA}
    				label="Categoria Administrativa"
    				onChange={this.handleChange}
    				multiple
    				renderValue={(selected) =>
    					selected.map((key) => CATEGORIA_ADMIN[key]).join(', ')
    				}
  			  	>
    				<MenuItem disabled value={''}><em>Vazio</em></MenuItem>
    				{Object.entries(CATEGORIA_ADMIN).map(
    					([key, value]) => (
    						<MenuItem
    						 key={key}
    						 value={key}
    						>
    							<Checkbox
    							 checked={this.state.TP_CATEGORIA_ADMINISTRATIVA.indexOf(key) > -1}
    							/>
    							<ListItemText primary={value} />
    						</MenuItem>
    					)
    				)}
  			  	</Select>
  			  </FormControl>
    	    
    	    {/* Botões */}
    	    <Stack
    	     direction='column'
    	     spacing={1}
    	     sx={{
    	     	height: '10rem',
    	     }}
    	    >
  				<Button
  				 variant="contained"
  				 color="success"
  				 onClick={this.handleSubmit}
  				 sx={{
  				 }}
  				>
  					Buscar
  				</Button>
  				
  				<Button  				
  				 variant="contained"
  				 color="primary"
  				 onClick={this.clearSearch}
  				>
  					Limpar
  				</Button>
  				
  				<Button
  				 variant="contained"
  				 color="error"
  				 onClick={this.closeDrawer}
  				>
  					Fechar
  				</Button>
    	  </Stack>
    	</Stack>
    );
  }
}
