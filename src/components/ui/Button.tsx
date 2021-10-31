import React, { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

export interface ButtonProps {
  handleClick?: () => void
  children: ReactNode
  type?: 'button' | 'submit'
}

export const Button: FC<ButtonProps> = ({ type = 'button', children, handleClick }) => {
  return (
    <Core
      type={type}
      onClick={handleClick ? handleClick : undefined}
    >
      {children}
    </Core>
  )
}

const Core = styled.button`
  height: 24px;
  border-radius: 4px;
  border: 1px solid #3a3a3a;
  padding-left: 10px;
  padding-right: 10px;
`
