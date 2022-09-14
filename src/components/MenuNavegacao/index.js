/* Menu de navegação entre as páginas principais (por exemplo, 
mapa e painel). */

import React from "react";
import Fab from '@mui/material/Fab';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from "@mui/material/Drawer";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// Valores permitidos para o prop currentPage, que indica a página
// atual.
const PAGES = [ 'mapa', 'painel' ];

export class MenuNavegacao extends React.Component {

  constructor(props) {
  	super(props);
  	
  	this.state = {
  		drawerOpen: false
  	};
  	  	  	
  	this.openDrawer = this.openDrawer.bind(this);
  	this.closeDrawer = this.closeDrawer.bind(this);
  	  	
  	if (!this.currentPage || !(PAGES.includes(this.currentPage))) {
  		this.currentPage = 'mapa';
  	}
  }
  
  openDrawer() {
  	this.setState({drawerOpen: true});
  }
  
  closeDrawer() {
  	this.setState({drawerOpen: false});
  }
  
  render() {
  	return (
  		<div>
  			<Fab
      	 	 color="primary"
      	 	 aria-label="Menu de navegação"
      	 	 onClick={this.openDrawer}
      	 	 sx={{
      	 		position: "fixed",
      	 		left: 0,
      	 		top: '10vw',
      	 	 }}
      		>
        		<MenuIcon />
      		</Fab>
      		
      		<Drawer
  			 open={this.state.drawerOpen}
  			 onClose={this.closeDrawer}
  			 sx={{
  			 	'& .MuiDrawer-paper': {
  			 		padding: '1rem',
  			 		width: '20vw',
  			 	},
  			 }}
  			>
  				{this.drawerContent()}
  			</Drawer>
  		</div>
  	);
  }

  drawerContent() {
    return (
    	<List component="nav">
        	<ListItemButton
        	 component="a"
        	 href="/"
          	 selected={this.props.currentPage === 'mapa'}
        	>
          		<ListItemText primary="Mapa" />
        	</ListItemButton>
        	
        	<ListItemButton
        	 component="a"
        	 href="/painel"
          	 selected={this.props.currentPage === 'painel'}
        	>
          		<ListItemText primary="Painel" />
        	</ListItemButton>
        	
        	<ListItemButton
        	 component="a"
        	 href="/api-docs"
        	>
          		<ListItemText primary="API (documentação)" />
        	</ListItemButton>
      	</List>
    );
  }
}
