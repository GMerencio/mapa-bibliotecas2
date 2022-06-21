/* Caixa de mensagem exibindo instruções de uso ao usuário. */

import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

export class TutorialDialog extends React.Component {
  render() {
  	const onClose = this.props.onClose;
  	const open = this.props.open;
  	
    return (
    	<Dialog
    	 onClose={onClose}
    	 open={open}
    	 aria-labelledby="tutorial-title">
    		<DialogTitle id="tutorial-title">
    			Tutorial de uso da aplicação
    		</DialogTitle>
    		
    		<DialogContent>
    			<DialogContentText>
    				Bem-vindo! Esta aplicação exibe as informações das
    				bibliotecas universitárias do Brasil através de um
    				mapa interativo. Caso queira ler este tutorial
    				novamente, clique no botão de ajuda ao lado.
    				
    				<br /> <br />
    				A visão inicial do mapa exibe as 5 regiões do
    				Brasil com a quantidade de instituições em cada
    				uma delas. Ao clicar no marcador de uma região, você vê
    				uma visão semelhante, mas em relação aos estados
    				da região. Você pode retornar à visão anterior
    				clicando no botão "Retornar à visão geral".
    				
    				<br /> <br />
    				Ao clicar em um estado, você vê os marcadores
    				das instituições. Marcadores muito próximos ficam
    				agrupados; você pode clicar nos marcadores de grupo
    				ou navegar usando o zoom (através do scroll do mouse
    				ou os botões de diminuir e aumentar zoom no menu
    				inferior). Clicando em um marcador de instituição,
    				você tem acesso a um resumo das informações da
    				biblioteca e pode ir à página da instituição para
    				ver mais detalhes ou obter direções à instituição.
    				
    				<br /> <br />
    				Clicando no botão "Opções de busca", você pode
    				filtrar as instituições de acordo com suas
    				características. Após selecionar as opções
    				desejadas, clique em "Buscar" para confirmar,
    				"Limpar" para reiniciar os filtros e "Fechar"
    				para sair. O botão "Limpar busca", ao lado do
    				botão de "Opções de busca", remove os filtros
    				de busca.
    				
    				<br /> <br />
    				O menu inferior exibe opções de controle de zoom,
    				brilho, contraste e esquema de cores do mapa.
    				O botão "Voltar aos valores originais" reinicia
    				o zoom, retornando à visão inicial, bem como os
    				valores de brilho, contraste e esquema de cores.
    				
    				<br /> <br />
    				Usuários de leitores de tela podem
    				navegar pelo mapa usando as teclas Tab (para avançar
    				a seleção), Enter (para confirmar a seleção),
    				Shift + Tab (para retornar a seleção) e Esc (para
    				fechar menus).
    			</DialogContentText>
    		</DialogContent>
    		
    		<DialogActions>
    			<Button onClick={onClose}>Fechar</Button>
    		</DialogActions>
    	</Dialog>
    );
  }
}
