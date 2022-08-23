import React, { useState } from 'react'
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

export const ButtonCreateWorker = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [workerName, setWorkerName] = useState<string>('')
  const [attributes, setAttirbutes] = useState<string>('')

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const modalHeadingID = 'modal-heading'

  return (
    <>
      <Button variant='primary' onClick={handleOpen}>
        + Create Worker
      </Button>
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
          <Label htmlFor='activity'>Activity</Label>
          <Select id='activity'>
            <Option value='baldwin'>James Baldwin</Option>
            <Option value='brown'>adrienne maree brown</Option>
            <Option value='butler'>Octavia Butler</Option>
            <Option value='coates'>Ta-Nehisi Coates</Option>
            <Option value='lorde'>Audre Lorde</Option>
            <Option value='nnedi'>Nnedi Okorafor</Option>
          </Select>
          <br />
          <Label htmlFor='attributes'>Attributes</Label>
          <TextArea
            id='attributes'
            name='attributes'
            onChange={e => setAttirbutes(e.target.value)}
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
    </>
  )
}
