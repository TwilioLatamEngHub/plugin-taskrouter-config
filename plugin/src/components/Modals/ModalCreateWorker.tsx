import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
  ModalHeader,
  ModalHeading,
  Option,
  Paragraph,
  Select,
  TextArea
} from '@twilio-paste/core'

interface ModalCreateWorkerProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  workspaceName: string
  activities: Array<any>
}

export const ModalCreateWorker = ({
  isOpen,
  setIsOpen,
  workspaceName,
  activities
}: ModalCreateWorkerProps): JSX.Element => {
  const [workerName, setWorkerName] = useState<string>('')
  const [attributes, setAttributes] = useState<string>('')

  const handleClose = () => setIsOpen(false)

  const modalHeadingID = 'modal-heading'

  return (
    <Modal
      ariaLabelledby={modalHeadingID}
      isOpen={isOpen}
      onDismiss={handleClose}
      size='default'
    >
      <ModalHeader>
        <ModalHeading as='h3' id={modalHeadingID}>
          Create Worker
        </ModalHeading>
      </ModalHeader>
      <ModalBody>
        <Label htmlFor='input-id'>Worker Name</Label>
        <Input
          id='input-id'
          value={workerName}
          onChange={e => setWorkerName(e.target.value)}
          type='text'
        />
        <br />
        <Label htmlFor='workspace-id'>Workspace</Label>
        <Paragraph>{workspaceName}</Paragraph>
        <Label htmlFor='activity'>Activity</Label>
        <Select id='activity'>
          {activities.map(({ friendlyName }) => {
            return <Option value={friendlyName}>{friendlyName}</Option>
          })}
        </Select>
        <br />
        <Label htmlFor='attributes'>Attributes</Label>
        <TextArea
          id='attributes'
          name='attributes'
          onChange={e => setAttributes(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <ModalFooterActions>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='primary'>Submit</Button>
        </ModalFooterActions>
      </ModalFooter>
    </Modal>
  )
}
