import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Mapa } from './index';

afterEach(cleanup);

test('Mapa montado corretamente', () => {
	render(<Mapa updateMap={() => {}} />);
	
	const map = document.querySelector('.leaflet-container');
	expect(map).toBeInTheDocument();
});

test('Mapa atualiza corretamente após ser montado', () => {
	let updated = false;
	render(<Mapa updateMap={() => {
		updated = true;
	}} />);
	
	expect(updated).toBe(true);
});