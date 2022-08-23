import React, { useContext, useState } from 'react'
import { Button } from '@twilio-paste/core'
import { ModalCreateWorker } from '../Modals'
import { TaskRouterConfigContext } from '../../contexts'
import { useFetchWorkspace } from '../../hooks'

export const ButtonCreateWorker = (): JSX.Element => {
  const { isLoading, setIsLoading } = useContext(TaskRouterConfigContext)
  const { workspaceName, activities, fetchWorkspace } = useFetchWorkspace()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = async () => {
    setIsOpen(true)
    setIsLoading(true)
    await fetchWorkspace()
  }

  return (
    <>
      <Button variant='primary' onClick={handleOpen} loading={isLoading}>
        + Create Worker
      </Button>
      {!isLoading && (
        <ModalCreateWorker
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          workspaceName={workspaceName}
          activities={activities}
        />
      )}
    </>
  )
}
