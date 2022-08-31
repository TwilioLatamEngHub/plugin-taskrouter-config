import React from 'react'
import { Modal, ModalBody, Table, TBody, Td, Th, Tr } from '@twilio-paste/core'

import { ModalCreateWorkerProps, modalHeadingID } from './ModalCreateWorker'

type ModalJSONWorkerProps = Omit<ModalCreateWorkerProps, 'setWorkers'> & {
  worker: any
}

export const ModalJSONWorker = ({
  isOpen,
  setIsOpen,
  worker
}: ModalJSONWorkerProps): JSX.Element => {
  const handleClose = () => setIsOpen(false)
  const keys = Object.keys(worker).filter(k => k !== 'links' && k !== 'url')

  return (
    <Modal
      ariaLabelledby={modalHeadingID}
      isOpen={isOpen}
      onDismiss={handleClose}
      size='wide'
    >
      <ModalBody>
        <Table variant='borderless'>
          <TBody>
            {keys.map((key, i) => (
              <Tr key={i}>
                <Th scope='row'>{key}</Th>
                <Td>{worker[key]}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </ModalBody>
    </Modal>
  )
}
