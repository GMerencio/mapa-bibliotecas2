/* Página contendo o dashboard/painel de dados. */

import React from "react";
import Box from "@mui/material/Box";

import { MenuNavegacao } from "../MenuNavegacao";

import "./style.css";

export class Painel extends React.Component {
  render() {
    return (
    	<div>
    		<MenuNavegacao currentPage='painel' />
    		<Box textAlign="center">
    			<iframe
    			 id="painelIframe"
       		 	 title="Painel de dados fornecido pelo Metabase"
       		 	 src="https://metabase-instance.herokuapp.com/public/dashboard/6fdd4a48-5d4b-48a6-917a-64a3043feac0"
       		 	 frameBorder="0"
       		 	 allowtransparency="true"
      			>
      			</iframe>
      		</Box>
    	</div>
    );
  }
}
