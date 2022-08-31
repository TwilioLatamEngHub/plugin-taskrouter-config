import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { Button } from '@twilio-paste/core'
import styled from 'styled-components'

import { ModalCreateWorker } from './ModalCreateWorker'
import { TaskRouterConfigContext, WorkersConfigContext } from '../../contexts'

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
  const { isLoading } = useContext(TaskRouterConfigContext)
  const { setFriendlyName } = useContext(WorkersConfigContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <ButtonWrapper>
      <Button
        variant='primary'
        onClick={() => {
          setIsOpen(true)
          setFriendlyName('')
        }}
        loading={isLoading}
      >
        + Create Worker
      </Button>
      <ModalCreateWorker
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setWorkers={setWorkers}
      />
    </ButtonWrapper>
  )
}
