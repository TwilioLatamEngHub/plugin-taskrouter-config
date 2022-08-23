import React, { useState } from 'react'
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
  ModalHeader,
  ModalHeading,
  Option,
  Paragraph,
  Select
} from '@twilio-paste/core'

export const ButtonCreateWorker = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const modalHeadingID = 'modal-heading'

  return (
    <>
      <Button variant='primary' onClick={handleOpen}>
        + Create Worker
      </Button>
      {/* <Modal
        ariaLabelledby={modalHeadingID}
        isOpen={isOpen}
        onDismiss={handleClose}
        size='default'
      >
        <ModalHeader>
          <ModalHeading as='h3' id={modalHeadingID}>
            Choose an author
          </ModalHeading>
        </ModalHeader>
        <ModalBody>
          <Paragraph>
            “If there’s a book that you want to read, but it hasn’t been written
            yet, then you must write it.” — Toni Morrison
          </Paragraph>

          <Label htmlFor='author'>Choose an author</Label>
          <Select id='author'>
            <Option value='baldwin'>James Baldwin</Option>
            <Option value='brown'>adrienne maree brown</Option>
            <Option value='butler'>Octavia Butler</Option>
            <Option value='coates'>Ta-Nehisi Coates</Option>
            <Option value='lorde'>Audre Lorde</Option>
            <Option value='nnedi'>Nnedi Okorafor</Option>
          </Select>
        </ModalBody>
        <ModalFooter>
          <ModalFooterActions>
            <Button variant='secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button variant='primary'>Done</Button>
          </ModalFooterActions>
        </ModalFooter>
      </Modal> */}
    </>
  )
}
