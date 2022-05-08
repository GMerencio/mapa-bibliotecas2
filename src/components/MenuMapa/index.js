/* Menu com opções de usabilidade e acessibilidade para o mapa. */

import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

export class MenuMapa extends React.Component {
  render() {
    return (
    	<Card variant="outlined">
    		<CardContent>
    			<Stack direction="row">
    				<Container>
    					<p>Zoom:</p>
    					<ButtonGroup variant="contained">
    						<Button
    							onClick={() => { this.props.changeZoom(true); }}
    						>
    							Aumentar zoom
    						</Button>
    						<Button
    							onClick={() => { this.props.changeZoom(false); }}
    						>
    							Diminuir zoom
    						</Button>
    					</ButtonGroup>
    				</Container>
    				
    				<Container>
    					<p>Contraste: </p>
    					<ButtonGroup variant="contained">
    						<Button
    							onClick={() => { this.props.changeContrast(true); }}
    						>
    							Aumentar contraste
    						</Button>
    						<Button
    							onClick={() => { this.props.changeContrast(false); }}
    						>
    							Diminuir contraste
    						</Button>
    					</ButtonGroup>
    				</Container>
    				
    				<Container>
    					<p>Brilho: </p>
    					<ButtonGroup variant="contained">
    						<Button
    							onClick={() => { this.props.changeBrightness(true); }}
    						>
    							Aumentar brilho
    						</Button>
    						<Button
    							onClick={() => { this.props.changeBrightness(false); }}
    						>
    							Diminuir brilho
    						</Button>
    					</ButtonGroup>
    				</Container>
    				
    				<Container>
    					<p>Esquema de cores: </p>
    					<ButtonGroup variant="contained">
    						<Button
    							onClick={() => { this.props.changeColorScheme('padrão'); }}
    						>
    							Padrão
    						</Button>
    						<Button
    							onClick={() => { this.props.changeColorScheme('preto-e-branco'); }}
    						>
    							Preto e branco
    						</Button>
    					</ButtonGroup>
    				</Container>
    			</Stack>
    		</CardContent>
    	</Card>
    );
  }
};
