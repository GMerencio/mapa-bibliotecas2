/* Página mostrando as informações de uma IES em detalhes. */

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import "./style.css";

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
  	const ies = this.state.ies;
    if(!ies) {
      return (<div />);
    }
    
    const tipoOrg = ORG_ACADEMICA[ies["TP_ORGANIZACAO_ACADEMICA"]];
    const catAdmin = CATEGORIA_ADMIN[ies["TP_CATEGORIA_ADMINISTRATIVA"]]
    return (
    	<div>
    		{/* Header */}
    		<Box
    		 direction="column"
    		 sx={{
    	  		width: '100vw',
    	  		height: 'auto',
    	  		backgroundColor: 'primary.dark',
    	  		color: '#fff',
    	  	 }}
    		>
    			<Chip
    			 icon={<ArrowBackIcon />}
  				 label="Retornar"
  				 component="a"
  				 variant="outlined"
  				 clickable
  				 sx={{
  					backgroundColor: '#fff',
  					fontWeight: '500',
  					fontSize: '1.5em',
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
    			 align="center"
    			 sx={{
  					fontSize: '4rem'
  				 }}
    			>
    				{`${ies["NO_IES"]} (${ies["SG_IES"]})`}
    			</Typography>
    		</Box>
    		
    		{/* Grid do conteúdo */}
    		<Grid
    		 container
    		 columnSpacing={2}
    		 rowSpacing={1}
    		>
    			{/* Informações da biblioteca */}
    			<Grid item xs={12} md={6}>
    			  <section className="section-container">
    			  	<Typography
    			  	 variant="h2"
    			  	 className="section-header">
    			  		Informações da biblioteca
    			  	</Typography>
    			  	<Divider className="divider" />
    			  	<Typography>
                    	Quantidade de livros eletrônicos:{" "}
                    	{ies["QT_LIVRO_ELETRONICO"]}
                  	</Typography>
                  	<Typography>
                    	Quantidade de periódicos eletrônicos:{" "}
                    	{ies["QT_PERIODICO_ELETRONICO"]}
                  	</Typography>
                  	<Typography>
                    	Tem acesso ao portal Capes de periódicos?{" "}
                    	{ies["IN_ACESSO_PORTAL_CAPES"] === "0" ? "Não" : "Sim"}
                  	</Typography>
                  	<Typography>
                    	Tem acesso a outras bases de dados licenciadas ou compradas?{" "}
                    	{ies["IN_ACESSO_OUTRAS_BASES"] === "0" ? "Não" : "Sim"}
                  	</Typography>
                  	<Typography>
                    	Assina outras bases de dados licenciadas ou compradas?{" "}
                    	{ies["IN_ASSINA_OUTRA_BASE"] === "0" ? "Não" : "Sim"}
                  	</Typography>
                  	<Typography>
                    	Tem catálogo online?{" "}
                    	{ies["IN_CATALOGO_ONLINE"] === "0" ? "Não" : "Sim"}
                  	</Typography>
                  	<Typography>
                    	Oferece serviços pela internet?{" "}
                    	{ies["IN_SERVICO_INTERNET"] === "0" ? "Não" : "Sim"}
                  	</Typography>
                  	<Typography>
                    	Busca integrada?{" "}
                    	{ies["IN_BUSCA_INTEGRADA"] === "0" ? "Não" : "Sim"}
                  	</Typography>
                  	<Typography>
                    	Biblioteca participa de redes sociais?{" "}
                    	{ies["IN_PARTICIPA_REDE_SOCIAL"] === "0" ? "Não" : "Sim"}
                  	</Typography>
                  </section>
    			</Grid>
    			
    			<Grid
    			 container
    			 item
    			 xs={12}
    			 md={6}
    			 rowSpacing={2}
    			>
    				{/* Informações administrativas */}
    				<Grid item xs={12} md={12}>
    					<section className="section-container">
    						<Typography
    			  	 		 variant="h2"
    			  	 		 className="section-header">
    			  				Informações da instituição
    			  			</Typography>
    			  			<Divider className="divider" />
    						<Typography>Ano do Censo: {ies["NU_ANO_CENSO"]}</Typography>
    						<Typography>Código da instituição: {ies["CO_IES"]}</Typography>
    						<Typography>Mantenedora: {ies["NO_MANTENEDORA"]}</Typography>
    						<Typography>Tipo da Organização Acadêmica: {tipoOrg}</Typography>
    						<Typography>Tipo da Categoria Administrativa: {catAdmin}</Typography>
    					</section>
    				</Grid>
    				
    				{/* Informações geográficas */}
    				<Grid item xs={12} md={12}>
    					<section className="section-container">
    						<Typography
    			  	 		 variant="h2"
    			  	 		 className="section-header">
    			  				Informações geográficas
    			  			</Typography>
    			  			<Divider className="divider" />
    						<Typography>Região: {ies["NO_REGIAO_IES"]}</Typography>
    						<Typography>Mesorregião: {ies["NO_MESORREGIAO_IES"]}</Typography>
    						<Typography>Microrregião: {ies["NO_MICRORREGIAO_IES"]}</Typography>
    						<Typography>Estado: {ies["NO_UF_IES"]}</Typography>
    						<Typography>Município: {ies["NO_MUNICIPIO_IES"]}</Typography>
    						<Typography>Endereço: {ies["end_completo_y"]}</Typography>
    					
    						<div className="mapouter">
  								<div className="gmap_canvas">
    								<iframe
    								title="mapa"
    							 	width="600"
    							 	height="500"
    							 	id="mapaIframe"
    							 	src={`https://maps.google.com/maps?q=${ies['end_completo_y']}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
    							 	frameBorder="0"
    							 	scrolling="no"
    							 	marginHeight="0"
    							 	marginWidth="0"
    								>
    								</iframe>
  								</div>
							</div>

    					</section>
    				</Grid>
    			</Grid>
    		</Grid>
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