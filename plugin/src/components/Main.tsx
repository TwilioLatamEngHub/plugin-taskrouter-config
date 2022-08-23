import React, { useState } from 'react'
import styled from 'styled-components'
import { Theme } from '@twilio-paste/theme'
import { Button } from '@twilio-paste/core'
import { DarkModeIcon } from '@twilio-paste/icons/esm/DarkModeIcon'
import { LightModeIcon } from '@twilio-paste/icons/esm/LightModeIcon'

import { ButtonCreateWorker } from './Buttons'

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const Main = (): JSX.Element => {
  const [togglePressed, setTogglePressed] = useState(false)

  return (
    <Theme.Provider
      theme={togglePressed ? 'dark' : 'default'}
      css='width: 100%'
    >
      <Button
        variant='secondary'
        onClick={() => setTogglePressed(!togglePressed)}
      >
        {togglePressed ? (
          <DarkModeIcon decorative />
        ) : (
          <LightModeIcon decorative />
        )}
      </Button>
      <MainContainer>
        <ButtonCreateWorker />
      </MainContainer>
    </Theme.Provider>
  )
}
