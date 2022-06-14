import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Mapa from './index';

afterEach(cleanup);

test('Mapa renderizado corretamente', () => {
	const { getByTestId } = render(<Mapa updateMap={() => {}} />);
	
	console.log(getByTestId('mapa-container'));
	expect(getByTestId('mapa-container')).toBeInTheDocument();
});