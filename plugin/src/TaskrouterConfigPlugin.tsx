import React from 'react'
import * as Flex from '@twilio/flex-ui'
import { FlexPlugin } from '@twilio/flex-plugin'

import { ButtonConfig, Main } from './components'
import { TaskRouterConfigContentProvider } from './contexts'

const PLUGIN_NAME = 'TaskrouterConfigPlugin'

export default class TaskrouterConfigPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME)
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    flex.SideNav.Content.add(<ButtonConfig key={'button-config'} />)

    flex.ViewCollection.Content.add(
      <Flex.View name='main-page' key='main-page-key'>
        <TaskRouterConfigContentProvider>
          <Main />
        </TaskRouterConfigContentProvider>
      </Flex.View>
    )
  }
}
