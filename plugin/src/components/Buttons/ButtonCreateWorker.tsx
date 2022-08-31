import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { Button } from '@twilio-paste/core'
import styled from 'styled-components'

import { ModalCreateWorker } from '../Modals'
import { TaskRouterConfigContext } from '../../contexts'
import { useFetchWorkspace } from '../../hooks'

const ButtonWrapper = styled.div`
  max-width: 10rem;
  margin-bottom: 1.5rem;
`

interface ButtonCreateWorkerProps {
  setWorkers: Dispatch<SetStateAction<any[]>>
}

export const ButtonCreateWorker = ({
  setWorkers
}: ButtonCreateWorkerProps): JSX.Element => {
  const { isLoading, setIsLoading } = useContext(TaskRouterConfigContext)
  const { workspaceName, activities, fetchWorkspace } = useFetchWorkspace()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = async () => {
    setIsOpen(true)
    setIsLoading(true)
    await fetchWorkspace()
  }

  return (
    <ButtonWrapper>
      <Button variant='primary' onClick={handleOpen} loading={isLoading}>
        + Create Worker
      </Button>
      {!isLoading && (
        <ModalCreateWorker
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          workspaceName={workspaceName}
          activities={activities}
          setWorkers={setWorkers}
        />
      )}
    </ButtonWrapper>
  )
}
