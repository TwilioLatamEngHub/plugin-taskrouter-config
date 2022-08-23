import React from 'react'
import { BuiltInIcon } from '@twilio-paste/icons/esm/BuiltInIcon'
import styled from 'styled-components'
import { Actions, SideLink } from '@twilio/flex-ui'

const BuiltInIconWrapper = styled.div`
  max-width: 1rem !important;
  max-height: 1rem !important;
`

export const ButtonConfig = (): JSX.Element => {
  return (
    <SideLink
      icon={<BuiltInIcon decorative={false} title='TaskRouter Config' />}
      onClick={() =>
        Actions.invokeAction('NavigateToView', { viewName: 'main-page' })
      }
    />
  )
}
