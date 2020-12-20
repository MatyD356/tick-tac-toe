import React from 'react'
import { render, screen } from '@testing-library/react'
import Board from '../components/Board'

test('renders Board component', () => {
  render(<Board />)
  const container = screen.getByLabelText('Board')
  expect(container).toBeInTheDocument()
})