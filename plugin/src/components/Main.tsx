import React, { useState } from 'react'
import styled from 'styled-components'
import { Theme } from '@twilio-paste/theme'
import { Button, Heading } from '@twilio-paste/core'
import { DarkModeIcon } from '@twilio-paste/icons/esm/DarkModeIcon'
import { LightModeIcon } from '@twilio-paste/icons/esm/LightModeIcon'

import { ButtonCreateWorker } from './Buttons'
import { Worker } from './Worker'

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const ButtonThemeWrapper = styled.div`
  align-self: flex-end;
`

export const Main = (): JSX.Element => {
  const [togglePressed, setTogglePressed] = useState(false)

  return (
    <div id='tester' style={{ width: '100%', margin: '1rem' }}>
      <Theme.Provider theme={togglePressed ? 'dark' : 'default'}>
        <MainContainer>
          <ButtonThemeWrapper>
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
          </ButtonThemeWrapper>
          <Worker />
        </MainContainer>
      </Theme.Provider>
    </div>
  )
}
