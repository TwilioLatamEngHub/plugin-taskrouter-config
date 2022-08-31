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
import { FileIcon } from '@twilio-paste/icons/esm/FileIcon'
import { EditIcon } from '@twilio-paste/icons/esm/EditIcon'
import { DeleteIcon } from '@twilio-paste/icons/esm/DeleteIcon'
import styled from 'styled-components'

import { ButtonCreateWorker } from './ButtonCreateWorker'
import { TaskRouterConfigContext, WorkersConfigContext } from '../../contexts'
import { deleteWorker, fetchWorkers, fetchWorkspace } from '../../services'
import { ModalUpdateWorker } from './ModalUpdateWorker'
import { ModalJSONWorker } from './ModalJSONWorker'

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`

export const Workers = (): JSX.Element => {
  const { isLoading, setIsLoading } = useContext(TaskRouterConfigContext)
  const { setActivities, setWorkspaceName } = useContext(WorkersConfigContext)
  const [worker, setWorker] = useState<any>({})
  const [workers, setWorkers] = useState<any[]>([])
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const [isWorkerModalOpen, setIsWorkerModalOpen] = useState<boolean>(false)
  const [isJSONModalOpen, setIsJSONModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const getWorkspace = async () => {
      await fetchWorkspace()
        .then(res => {
          setWorkspaceName(res.workspaceName)
          setActivities(res.activities)
          setIsLoading(false)
        })
        .catch(err => {
          console.log(err)
          setIsLoading(false)
        })
    }
    getWorkspace()
  }, [])

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

  const handleJSON = (sid: string) => {
    setIsJSONModalOpen(true)
    const clickedWorker = workers.find(w => w.sid === sid)
    setWorker(clickedWorker)
  }

  const handleEdit = (sid: string) => {
    setIsWorkerModalOpen(!isWorkerModalOpen)
    const clickedWorker = workers.find(w => w.sid === sid)
    setWorker(clickedWorker)
  }

  const handleAlertOpen = () => setIsAlertOpen(true)
  const handleAlertClose = () => setIsAlertOpen(false)

  const handleDelete = async (sid: string) => {
    setIsLoading(true)
    try {
      await deleteWorker(sid)
        .then(res => {
          if (res.error) throw new Error(res.error)
        })
        .then(async () => {
          setIsAlertOpen(false)
          await fetchWorkers().then((workers: any) => setWorkers(workers))
        })
      setIsLoading(false)
      Notifications.showNotification('workerDeleted')
    } catch (error) {
      console.error(error)
      setIsLoading(false)
      setIsAlertOpen(false)
      Notifications.showNotification('errorWorkerCreated')
    }
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
            <Th textAlign='center'>JSON</Th>
            <Th textAlign='center'>Edit</Th>
            <Th textAlign='center'>Delete</Th>
          </Tr>
        </THead>
        <TBody>
          {!isLoading && workers.length > 0 ? (
            <>
              {workers.map(worker => (
                <Tr key={worker.sid}>
                  <Th scope='row'>{worker.friendlyName}</Th>
                  <Td>{worker.sid}</Td>
                  <Td textAlign='right'>
                    <IconWrapper onClick={() => handleJSON(worker.sid)}>
                      <FileIcon decorative={false} title='Worker Details' />
                    </IconWrapper>
                  </Td>
                  <Td textAlign='right'>
                    <IconWrapper onClick={() => handleEdit(worker.sid)}>
                      <EditIcon decorative={false} title='Edit Worker' />
                    </IconWrapper>
                  </Td>
                  <Td textAlign='right'>
                    <IconWrapper onClick={handleAlertOpen}>
                      <DeleteIcon decorative={false} title='Delete Worker' />
                    </IconWrapper>
                    <AlertDialog
                      heading='Delete Agent?'
                      isOpen={isAlertOpen}
                      onConfirm={() => handleDelete(worker.sid)}
                      onConfirmLabel='Submit'
                      onDismiss={handleAlertClose}
                      onDismissLabel='Cancel'
                    >
                      Are you sure you want to delete this agent?
                    </AlertDialog>
                  </Td>
                </Tr>
              ))}
              <ModalUpdateWorker
                isOpen={isWorkerModalOpen}
                setIsOpen={setIsWorkerModalOpen}
                setWorkers={setWorkers}
                worker={worker}
              />
              <ModalJSONWorker
                isOpen={isJSONModalOpen}
                setIsOpen={setIsJSONModalOpen}
                worker={worker}
              />
            </>
          ) : (
            <Tr>
              <Th scope='row'>
                <SkeletonLoader />
              </Th>
              <Td>
                <SkeletonLoader />
              </Td>
              <Td textAlign='right'>
                <SkeletonLoader />
              </Td>
              <Td textAlign='right'>
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
