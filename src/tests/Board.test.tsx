import React from 'react'
import { render, screen } from '@testing-library/react'
import Board from '../components/Board'
import Square from '../components/Square'

test('renders Board component', () => {
  render(<Board />)
  const container = screen.getByLabelText('Board')
  expect(container).toBeInTheDocument()
})
/* test.todo('renders a square for every item in given arr', () => {
  const arr = Array(9).fill('')
  render(<Board />)
}) */