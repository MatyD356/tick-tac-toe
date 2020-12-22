import React from 'react'
import { render, screen } from '@testing-library/react'
import Square from '../components/Square'

test('Renders Square component', () => {
  const handleClick = jest.fn()
  render(<Square onClick={handleClick} value='' id={1} />)
  const container = screen.getByLabelText('Square')
  expect(container).toBeInTheDocument()
})
test.todo('Calls handleClick on click event')