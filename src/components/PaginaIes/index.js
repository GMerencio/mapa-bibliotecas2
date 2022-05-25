/* Página mostrando as informações de uma IES em detalhes. */

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

class PaginaIes extends React.Component {
  constructor(props) {
  	super(props);
  	
  	this.state = {
  		ies: null
  	};
  }
  
  componentDidMount() {
  	const coIes = this.props.params.id;
  	fetch(`/api/ies/${coIes}`)
      .then(res => res.json())
      .then(jsonRes => this.setState({ies: jsonRes}));
  }
  
  render() {
    if(!this.state.ies) {
      return (<div />);
    }
    
    return (
    	<div>
    		<Box
    		 tabIndex="0"
    		 direction="column"
    		 sx={{
    	  		width: '100vw',
    	  		height: 'auto',
    	  		backgroundColor: 'primary.dark',
    	  		color: '#fff',
    	  	 }}
    		>
    			<Chip
  					label="Voltar"
  					component="a"
  					variant="outlined"
  					clickable
  					sx={{
  						backgroundColor: '#fff',
  						'&:hover': {
  							backgroundColor: '#ebebeb !important',
  						}
  					}}
  					onClick={() => {
                    	this.props.navigate(-1);
                  	}}
				/>
    			<Typography
    				variant="h1"
    				tabIndex="0"
    				align="center">
    				{this.state.ies["NO_IES"]}
    			</Typography>
    		</Box>
    		
        	<p tabIndex="0">
        		Endereço: {this.state.ies["end_completo_y"]}
        	</p>
        	<p tabIndex="0">
        		Quantidade de livros eletrônicos:{" "}
        		{this.state.ies["QT_LIVRO_ELETRONICO"]}
        	</p>
        	<p tabIndex="0">
        		Quantidade de periódicos eletrônicos:{" "}
        		{this.state.ies["QT_PERIODICO_ELETRONICO"]}
        	</p>
        	<p tabIndex="0">
        		Tem acesso ao portal Capes de periódicos?{" "}
        		{this.state.ies["IN_ACESSO_PORTAL_CAPES"] === "0" ? "Não" : "Sim"}
        	</p>
        	<p tabIndex="0">
        		Tem acesso a outras bases de dados licenciadas ou compradas?{" "}
        		{this.state.ies["IN_ACESSO_OUTRAS_BASES"] === "0" ? "Não" : "Sim"}
        	</p>
        	<p tabIndex="0">
        		Assina outras bases de dados licenciadas ou compradas?{" "}
        		{this.state.ies["IN_ASSINA_OUTRA_BASE"] === "0" ? "Não" : "Sim"}
        	</p>
        	<p tabIndex="0">
        		Tem catálogo online?{" "}
        		{this.state.ies["IN_CATALOGO_ONLINE"] === "0" ? "Não" : "Sim"}
        	</p>
        	<p tabIndex="0">
        		Oferece serviços pela internet?{" "}
        		{this.state.ies["IN_SERVICO_INTERNET"] === "0" ? "Não" : "Sim"}
        	</p>
        	<p tabIndex="0">
        		Busca integrada?{" "}
        		{this.state.ies["IN_BUSCA_INTEGRADA"] === "0" ? "Não" : "Sim"}
        	</p>
        	<p tabIndex="0">
        		Biblioteca participa de redes sociais?{" "}
        		{this.state.ies["IN_PARTICIPA_REDE_SOCIAL"] === "0" ? "Não" : "Sim"}
        	</p>
        	<p tabIndex="0">
        		(Informações do censo de {this.state.ies["NU_ANO_CENSO"]})
        	</p>
        </div>
    );
  }
}

// Wrapper para que a classe possa acessar informação de hooks
const withParams = (Component) => (props) => {
	const params = useParams();
	const navigate = useNavigate();
	return (
    	<PaginaIes
        	{...props}
        	params={params}
        	navigate={navigate}
    	/>
    );
};

export default withParams(PaginaIes);