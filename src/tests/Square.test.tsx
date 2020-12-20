import React from 'react'
import { render, screen } from '@testing-library/react'
import Square from '../components/Square'

test('Renders Square component', () => {
  render(<Square />)
  const container = screen.getByLabelText('Square')
  expect(container).toBeInTheDocument()
})