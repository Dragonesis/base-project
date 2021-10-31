
import React, { FC, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { cleanerString } from '@/utils'

export type valueType = string | number
export interface TextfieldProps {
  onChange: (value: valueType) => void
  type?: 'text'
  value: valueType
  name: string
  returnValueType?: 'onlyNumber'
}

export const Textfield: FC<TextfieldProps> = ({ type = 'text', value, returnValueType, onChange, name }) => {
  const [newValue, setNewValue] = useState(value)
  const handleChange = useCallback((value) => {
    const newValue = cleanerString(value, returnValueType)
    setNewValue(newValue)
    onChange(newValue)
  }, [returnValueType, onChange])

  return (
    <Core
      type={type}
      value={newValue}
      name={name}
      aria-label={name}
      aria-labelledby={name}
      onChange={(e) => handleChange(e.target.value)}
    />
  )
}

const Core = styled.input`
  width: 100%;
  height: 24px;
  border-radius: 4px;
  border: 1px solid #3a3a3a;
  padding-left: 10px;
  padding-right: 10px;
`
