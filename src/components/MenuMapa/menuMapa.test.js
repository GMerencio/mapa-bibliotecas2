import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MenuMapa } from './index';

afterEach(cleanup);

const updateFunction = () => {};

test('MenuMapa montado corretamente', () => {
	const { asFragment } = render(
		<MenuMapa
          	changeZoom={updateFunction}
          	changeContrast={updateFunction}
          	changeBrightness={updateFunction}
          	changeColorScheme={updateFunction}
          	resetFilters={updateFunction}
    	/>);
	
	expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class="MuiPaper-root MuiPaper-outlined MuiPaper-rounded MuiCard-root css-1v5z4dq-MuiPaper-root-MuiCard-root"
  >
    <div
      class="MuiCardContent-root css-17b595n-MuiCardContent-root"
    >
      <div
        class="css-193cgzp-MuiStack-root"
      >
        <div
          class="MuiContainer-root MuiContainer-maxWidthLg css-1oqqzyl-MuiContainer-root"
        >
          <p>
            Tamanho do mapa: 
            <i
              aria-hidden="true"
              class="fa fa-search-plus"
            />
          </p>
          <div
            class="MuiButtonGroup-root MuiButtonGroup-contained css-zqcytf-MuiButtonGroup-root"
            role="group"
          >
            <button
              class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary css-sghohy-MuiButtonBase-root-MuiButton-root"
              tabindex="0"
              type="button"
            >
              Aumentar mapa +
              <span
                class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
              />
            </button>
            <button
              class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary css-sghohy-MuiButtonBase-root-MuiButton-root"
              tabindex="0"
              type="button"
            >
              Diminuir mapa -
              <span
                class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
              />
            </button>
          </div>
        </div>
        <div
          class="MuiContainer-root MuiContainer-maxWidthLg css-1oqqzyl-MuiContainer-root"
        >
          <p>
            Contraste: 
            <i
              aria-hidden="true"
              class="fa fa-adjust"
            />
             
          </p>
          <div
            class="MuiButtonGroup-root MuiButtonGroup-contained css-zqcytf-MuiButtonGroup-root"
            role="group"
          >
            <button
              class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary css-sghohy-MuiButtonBase-root-MuiButton-root"
              tabindex="0"
              type="button"
            >
              Mais contraste +
              <span
                class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
              />
            </button>
            <button
              class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary css-sghohy-MuiButtonBase-root-MuiButton-root"
              tabindex="0"
              type="button"
            >
              Menos contraste -
              <span
                class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
              />
            </button>
          </div>
        </div>
        <div
          class="MuiContainer-root MuiContainer-maxWidthLg css-1oqqzyl-MuiContainer-root"
        >
          <p>
            Brilho: 
            <i
              aria-hidden="true"
              class="fa fa-sun-o"
            />
          </p>
          <div
            class="MuiButtonGroup-root MuiButtonGroup-contained css-zqcytf-MuiButtonGroup-root"
            role="group"
          >
            <button
              class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary css-sghohy-MuiButtonBase-root-MuiButton-root"
              tabindex="0"
              type="button"
            >
              Mais brilho +
              <span
                class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
              />
            </button>
            <button
              class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary css-sghohy-MuiButtonBase-root-MuiButton-root"
              tabindex="0"
              type="button"
            >
              Menos brilho -
              <span
                class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
              />
            </button>
          </div>
        </div>
        <div
          class="MuiContainer-root MuiContainer-maxWidthLg css-1oqqzyl-MuiContainer-root"
        >
          <p>
            Esquema de cores: 
            <i
              aria-hidden="true"
              class="fa fa-eyedropper"
            />
          </p>
          <div
            class="MuiButtonGroup-root MuiButtonGroup-contained css-zqcytf-MuiButtonGroup-root"
            role="group"
          >
            <button
              class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary css-sghohy-MuiButtonBase-root-MuiButton-root"
              tabindex="0"
              type="button"
            >
              Padrão
              <span
                class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
              />
            </button>
            <button
              class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary css-sghohy-MuiButtonBase-root-MuiButton-root"
              tabindex="0"
              type="button"
            >
              Escala de cinza
              <span
                class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
              />
            </button>
          </div>
        </div>
        <div
          class="MuiContainer-root MuiContainer-maxWidthLg css-1oqqzyl-MuiContainer-root"
        >
          <p>
             
          </p>
          <div
            class="MuiButtonGroup-root MuiButtonGroup-contained css-zqcytf-MuiButtonGroup-root"
            role="group"
          >
            <button
              class="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary css-sghohy-MuiButtonBase-root-MuiButton-root"
              tabindex="0"
              type="button"
            >
              Voltar aos valores originais
              <span
                class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</DocumentFragment>
`);
});