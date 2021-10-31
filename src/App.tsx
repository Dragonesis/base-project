import React from 'react'
import styled from '@emotion/styled'
import '@/assets/styles/theme.css'
import '@/assets/styles/main.css'

import { Button } from '#/ui'

export const App = () => {
  return (
    <>
      <Container>
        <h1>Text</h1>
        <Button type='button'>
          <>fwfwfwf</>
        </Button>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: calc(100% - 30px);
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`
