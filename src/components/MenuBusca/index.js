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
  		capes: '',
  		acessoOutrasBases: '',
  		assinaOutrasBases: '',
  		catalogoOnline: '',
  		servicosInternet: '',
  		buscaIntegrada: '',
  		redeSocial: '',
  		orgAcademica: [],
  		categoriaAdmin: [],
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
  		
  		if (key === 'orgAcademica' || key === 'categoriaAdmin') {
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
    	      	<InputLabel id="capes-label">
    	      		Acesso ao portal Capes
    	      	</InputLabel>
  			  	<Select
    				labelId="capes-label"
    				id="capes"
    				name="capes"
    				value={this.state.capes}
    				label="Acesso ao portal Capes"
    				onChange={this.handleChange}
  			  	>
    				<MenuItem value={''}><em>Vazio</em></MenuItem>
    				<MenuItem value={"1"}>Sim</MenuItem>
    				<MenuItem value={"0"}>Não</MenuItem>
  			  	</Select>
  			  </FormControl>
    	    
    	      <FormControl fullWidth>
    	      	<InputLabel id="acessoOutrasBases-label">
    	      		Acesso a outras bases
    	      	</InputLabel>
  			  	<Select
    				labelId="acessoOutrasBases-label"
    				id="acessoOutrasBases"
    				name="acessoOutrasBases"
    				value={this.state.acessoOutrasBases}
    				label="Acesso a outras bases"
    				onChange={this.handleChange}
  			  	>
    				<MenuItem value={''}><em>Vazio</em></MenuItem>
    				<MenuItem value={"1"}>Sim</MenuItem>
    				<MenuItem value={"0"}>Não</MenuItem>
  			  	</Select>
  			  </FormControl>
  			  
  			  <FormControl fullWidth>
    	      	<InputLabel id="assinaOutrasBases-label">
    	      		Assina outras bases
    	      	</InputLabel>
  			  	<Select
    				labelId="assinaOutrasBases-label"
    				id="assinaOutrasBases"
    				name="assinaOutrasBases"
    				value={this.state.assinaOutrasBases}
    				label="Assina outras bases"
    				onChange={this.handleChange}
  			  	>
    				<MenuItem value={''}><em>Vazio</em></MenuItem>
    				<MenuItem value={"1"}>Sim</MenuItem>
    				<MenuItem value={"0"}>Não</MenuItem>
  			  	</Select>
  			  </FormControl>
  			  
  			  <FormControl fullWidth>
    	      	<InputLabel id="catalogoOnline-label">
    	      		Tem catálogo online
    	      	</InputLabel>
  			  	<Select
    				labelId="catalogoOnline-label"
    				id="catalogoOnline"
    				name="catalogoOnline"
    				value={this.state.catalogoOnline}
    				label="Tem catálogo online"
    				onChange={this.handleChange}
  			  	>
    				<MenuItem value={''}><em>Vazio</em></MenuItem>
    				<MenuItem value={"1"}>Sim</MenuItem>
    				<MenuItem value={"0"}>Não</MenuItem>
  			  	</Select>
  			  </FormControl>
  			  
  			  <FormControl fullWidth>
    	      	<InputLabel id="buscaIntegrada-label">
    	      		Tem busca integrada
    	      	</InputLabel>
  			  	<Select
    				labelId="buscaIntegrada-label"
    				id="buscaIntegrada"
    				name="buscaIntegrada"
    				value={this.state.buscaIntegrada}
    				label="Tem busca integrada"
    				onChange={this.handleChange}
  			  	>
    				<MenuItem value={''}><em>Vazio</em></MenuItem>
    				<MenuItem value={"1"}>Sim</MenuItem>
    				<MenuItem value={"0"}>Não</MenuItem>
  			  	</Select>
  			  </FormControl>
  			  
  			  <FormControl fullWidth={true}>
    	      	<InputLabel id="servicosInternet-label">
    	      		Oferece serviços pela internet
    	      	</InputLabel>
  			  	<Select
    				labelId="servicosInternet-label"
    				id="servicosInternet"
    				name="servicosInternet"
    				value={this.state.servicosInternet}
    				label="Oferece serviços pela internet"
    				onChange={this.handleChange}
  			  	>
    				<MenuItem value={''}><em>Vazio</em></MenuItem>
    				<MenuItem value={"1"}>Sim</MenuItem>
    				<MenuItem value={"0"}>Não</MenuItem>
  			  	</Select>
  			  </FormControl>
  			  
  			  <FormControl fullWidth={true}>
    	      	<InputLabel id="redeSocial-label">
    	      		Participa de redes sociais
    	      	</InputLabel>
  			  	<Select
    				labelId="redeSocial-label"
    				id="redeSocial"
    				name="redeSocial"
    				value={this.state.redeSocial}
    				label="Participa de redes sociais"
    				onChange={this.handleChange}
  			  	>
    				<MenuItem value={''}><em>Vazio</em></MenuItem>
    				<MenuItem value={"1"}>Sim</MenuItem>
    				<MenuItem value={"0"}>Não</MenuItem>
  			  	</Select>
  			  </FormControl>
  			  
  			  <FormControl fullWidth={true}>
    	      	<InputLabel id="orgAcademica-label">
    	      		Organização Acadêmica
    	      	</InputLabel>
  			  	<Select
    				labelId="orgAcademica-label"
    				id="orgAcademica"
    				name="orgAcademica"
    				value={this.state.orgAcademica}
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
    							 checked={this.state.orgAcademica.indexOf(key) > -1}
    							/>
    							<ListItemText primary={value} />
    						</MenuItem>
    					)
    				)}
  			  	</Select>
  			  </FormControl>
  			  
  			  <FormControl fullWidth={true}>
    	      	<InputLabel id="categoriaAdmin-label">
    	      		Categoria Administrativa
    	      	</InputLabel>
  			  	<Select
    				labelId="categoriaAdmin-label"
    				id="categoriaAdmin"
    				name="categoriaAdmin"
    				value={this.state.categoriaAdmin}
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
    							 checked={this.state.categoriaAdmin.indexOf(key) > -1}
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
