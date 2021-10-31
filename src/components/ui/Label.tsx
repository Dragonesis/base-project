import React, { FC } from 'react'
import styled from '@emotion/styled'

export interface LabelProps {
  text: string
  id?: string
}

export const Label: FC<LabelProps> = ({ text, id }) => {
  return (
    <Core id={id}>{text}</Core>
  )
}

const Core = styled.span`
  font-size: 14px;
  margin-bottom: 4px;
  display: inline-block;
`
