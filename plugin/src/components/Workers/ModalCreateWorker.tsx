import React, { Dispatch, SetStateAction, useContext } from 'react'
import { Notifications } from '@twilio/flex-ui'
import {
  Anchor,
  Box,
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
  TextArea,
  Tooltip
} from '@twilio-paste/core'
import { InformationIcon } from '@twilio-paste/icons/esm/InformationIcon'

import { TaskRouterConfigContext, WorkersConfigContext } from '../../contexts'
import { createWorker, fetchWorkers } from '../../services'

export interface ModalCreateWorkerProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setWorkers: Dispatch<SetStateAction<any[]>>
}

export const modalHeadingID = 'modal-heading'

export const tooltipText = `Attributes model each Worker's unique properties as a JSON document. Workflows route Tasks to Workers based on these attributes. Example: {"name": "Alice", "technical_skill": 5, "languages": ["pt", "es", "en"]}`
export const tooltipURL =
  'https://www.twilio.com/docs/taskrouter/api/worker#worker-properties'

export const ModalCreateWorker = ({
  isOpen,
  setIsOpen,
  setWorkers
}: ModalCreateWorkerProps): JSX.Element => {
  const { isLoading, setIsLoading } = useContext(TaskRouterConfigContext)
  const {
    activities,
    workspaceName,
    activitySid,
    setActivitySid,
    friendlyName,
    setFriendlyName,
    attributes,
    setAttributes
  } = useContext(WorkersConfigContext)

  const handleClose = () => setIsOpen(false)

  const handleOnSubmit = async () => {
    setIsLoading(true)

    await createWorker({ friendlyName, activitySid, attributes })
      .then(async () => {
        setIsOpen(false)
        await fetchWorkers().then((workers: any) => setWorkers(workers))
      })
      .then(() => {
        setIsLoading(false)
        Notifications.showNotification('workerCreated')
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
        setIsOpen(false)
        Notifications.showNotification('errorWorkerCreated')
      })

    setIsLoading(false)
  }

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
        <Label htmlFor='input-id' required>
          Worker Name
        </Label>
        <Input
          id='input-id'
          value={friendlyName}
          onChange={e => setFriendlyName(e.target.value)}
          type='text'
          required
        />
        <br />
        <Label htmlFor='workspace-id'>Workspace</Label>
        <Paragraph>{workspaceName}</Paragraph>
        <Label htmlFor='activity'>Activity</Label>
        <Select
          id='activity'
          name='activity'
          defaultValue={activities.length > 0 && activities[0].sid}
          onChange={e => setActivitySid(e.target.value)}
        >
          {activities.map(({ friendlyName, sid }) => {
            return <Option value={sid}>{friendlyName}</Option>
          })}
        </Select>
        <br />
        <Box display='flex' alignItems='center'>
          <Label htmlFor='attributes'>Attributes</Label>
          <Tooltip text={tooltipText}>
            <Anchor
              href={tooltipURL}
              marginBottom='space10'
              marginLeft='space10'
            >
              <InformationIcon
                decorative={false}
                title='Open Tooltip'
                display='block'
              />
            </Anchor>
          </Tooltip>
        </Box>
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
          <Button
            variant='primary'
            loading={isLoading}
            onClick={handleOnSubmit}
          >
            Submit
          </Button>
        </ModalFooterActions>
      </ModalFooter>
    </Modal>
  )
}
