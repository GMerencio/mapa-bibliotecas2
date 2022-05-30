/* Menu com opções de usabilidade e acessibilidade para o mapa. */

import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

export class MenuMapa extends React.Component {
  render() {
    return (
      <Card variant="outlined">
        <CardContent
          sx={{
            padding: 0,
            "&:last-child": {
              paddingBottom: "5px",
            },
          }}
        >
          {/* TODO: Alternar para column com media query */}
          <Stack direction="row">
            <Container>
              <p>
                Tamanho do mapa:{" "}
                <i className="fa fa-search-plus" aria-hidden="true"></i>
              </p>
              <ButtonGroup variant="contained">
                <Button
                  onClick={() => {
                    this.props.changeZoom(true, false);
                  }}
                >
                  Aumentar mapa +
                </Button>
                <Button
                  onClick={() => {
                    this.props.changeZoom(false, false);
                  }}
                >
                  Diminuir mapa -
                </Button>
              </ButtonGroup>
            </Container>

            <Container>
              <p>
                Contraste: <i className="fa fa-adjust" aria-hidden="true"></i>{" "}
              </p>
              <ButtonGroup variant="contained">
                <Button
                  onClick={() => {
                    this.props.changeContrast(10);
                  }}
                >
                  Mais contraste +
                </Button>
                <Button
                  onClick={() => {
                    this.props.changeContrast(-10);
                  }}
                >
                  Menos contraste -
                </Button>
              </ButtonGroup>
            </Container>

            <Container>
              <p>
                Brilho: <i className="fa fa-sun-o" aria-hidden="true"></i>
              </p>
              <ButtonGroup variant="contained">
                <Button
                  onClick={() => {
                    this.props.changeBrightness(10);
                  }}
                >
                  Mais brilho +
                </Button>
                <Button
                  onClick={() => {
                    this.props.changeBrightness(-10);
                  }}
                >
                  Menos brilho -
                </Button>
              </ButtonGroup>
            </Container>

            <Container>
              <p>
                Esquema de cores:{" "}
                <i className="fa fa-eyedropper" aria-hidden="true"></i>
              </p>
              <ButtonGroup variant="contained">
                <Button
                  onClick={() => {
                    this.props.changeColorScheme("padrão");
                  }}
                >
                  Padrão
                </Button>
                <Button
                  onClick={() => {
                    this.props.changeColorScheme("escaladecinza");
                  }}
                >
                  Escala de cinza
                </Button>
              </ButtonGroup>
            </Container>

            {/* TODO: Salvar ajustes automaticamente com localStorage */}
            <Container>
              <p>&nbsp;</p>
              <ButtonGroup variant="contained">
                <Button
                  onClick={() => {
                    const delta = 0;
                    this.props.changeBrightness(delta);
                    this.props.changeContrast(delta);
                    this.props.changeColorScheme("padrão");
                    this.props.changeZoom(false, true);
                  }}
                >
                  Voltar aos valores originais
                </Button>
              </ButtonGroup>
            </Container>
          </Stack>
        </CardContent>
      </Card>
    );
  }
}
