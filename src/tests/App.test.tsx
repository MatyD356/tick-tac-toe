import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders app component', () => {
  render(<App />);
  const container = screen.getByTestId('App')
  expect(container).toBeInTheDocument();
});
