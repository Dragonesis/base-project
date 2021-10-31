import React, { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

import { Label } from './Label'

export interface FieldWrapProps {
  children: ReactNode
  label: string
  name: string
  className?: string
}

export const FieldWrap: FC<FieldWrapProps> = ({ children, label, className, name }) => {
  return (
    <Core className={className}>
      <Label text={label} id={name} />
      {children}
    </Core>
  )
}

const Core = styled.label`
  display: inline-block;
`