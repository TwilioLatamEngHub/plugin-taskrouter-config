import React from 'react'
import { BuiltInIcon } from '@twilio-paste/icons/esm/BuiltInIcon'
import { Actions, SideLink } from '@twilio/flex-ui'

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
