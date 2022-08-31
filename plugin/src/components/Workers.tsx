import React, { useContext, useEffect, useState } from 'react'
import { Notifications } from '@twilio/flex-ui'
import {
  AlertDialog,
  Heading,
  SkeletonLoader,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr
} from '@twilio-paste/core'
import { DeleteIcon } from '@twilio-paste/icons/esm/DeleteIcon'
import styled from 'styled-components'

import { ButtonCreateWorker } from './Buttons'
import { TaskRouterConfigContext } from '../contexts'
import { deleteWorker, fetchWorkers } from '../services'

const DeleteIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`

export const Workers = (): JSX.Element => {
  const { isLoading, setIsLoading } = useContext(TaskRouterConfigContext)
  const [workers, setWorkers] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  useEffect(() => {
    setIsLoading(true)
    const handleFetchWorkers = async () => {
      await fetchWorkers()
        .then((workers: any) => {
          setWorkers(workers)
          setIsLoading(false)
        })
        .catch(err => {
          console.log(err)
          setIsLoading(false)
        })
    }
    handleFetchWorkers()
  }, [])

  const handleDelete = async (sid: string) => {
    setIsLoading(true)
    await deleteWorker(sid)
      .then(async () => {
        setIsOpen(false)
        await fetchWorkers().then((workers: any) => setWorkers(workers))
      })
      .then(() => {
        setIsLoading(false)
        Notifications.showNotification('workerDeleted')
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
        setIsOpen(false)
        Notifications.showNotification('errorWorkerCreated')
      })
  }

  return (
    <>
      <Heading as='h1' variant='heading10'>
        Workers
      </Heading>
      <ButtonCreateWorker setWorkers={setWorkers} />
      <Table variant='borderless'>
        <THead>
          <Tr>
            <Th>Agent</Th>
            <Th>SID</Th>
            <Th textAlign='center'>Delete</Th>
          </Tr>
        </THead>
        <TBody>
          {!isLoading && workers.length > 0 ? (
            workers.map(worker => (
              <Tr key={worker.sid}>
                <Th scope='row'>{worker.friendlyName}</Th>
                <Td>{worker.sid}</Td>
                <Td textAlign='right'>
                  <DeleteIconWrapper onClick={handleOpen}>
                    <DeleteIcon decorative={false} title='Delete Agent' />
                  </DeleteIconWrapper>
                  <AlertDialog
                    heading='Delete Agent?'
                    isOpen={isOpen}
                    onConfirm={() => handleDelete(worker.sid)}
                    onConfirmLabel='Submit'
                    onDismiss={handleClose}
                    onDismissLabel='Cancel'
                  >
                    Are you sure you want to delete this agent?
                  </AlertDialog>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Th scope='row'>
                <SkeletonLoader />
              </Th>
              <Td>
                <SkeletonLoader />
              </Td>
              <Td>
                <SkeletonLoader />
              </Td>
              <Td textAlign='right'>
                <SkeletonLoader />
              </Td>
            </Tr>
          )}
        </TBody>
      </Table>
    </>
  )
}
