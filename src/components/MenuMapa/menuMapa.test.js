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
	
	expect(asFragment()).toMatchInlineSnapshot();
});