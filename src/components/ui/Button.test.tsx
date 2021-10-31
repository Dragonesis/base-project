import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from './Button'

it('Button renders correctly', () => {
  const { asFragment } = render(<Button>Button</Button>)
  expect(asFragment()).toMatchSnapshot()
})

it('Button children test', () => {
  render(<Button type='submit'>Button</Button>)
  expect(screen.getByText('Button')).toBeInTheDocument()
})

it('Button type test', () => {
  render(
    <>
      <Button type='button'>Button</Button>
      <Button type='submit'>Submit</Button>
    </>
  )

  expect(screen.getByText('Button')).toHaveAttribute('type', 'button')
  expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit')
})

it('Button callback test', () => {
  const handleClick = jest.fn()
  render(<Button type='submit' handleClick={handleClick}>Button</Button>)
  const button = screen.getByText('Button')
  expect(button).toBeInTheDocument()
  userEvent.click(button)
  expect(handleClick).toHaveBeenCalled()
})
