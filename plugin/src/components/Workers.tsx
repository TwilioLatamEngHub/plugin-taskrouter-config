import {
  Box,
  Heading,
  SkeletonLoader,
  Stack,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr
} from '@twilio-paste/core'
import React, { useEffect, useState } from 'react'
import { ButtonCreateWorker } from './Buttons'

interface Workers {
  workers: any[]
}

export const Workers = (): JSX.Element => {
  const [workers, setWorkers] = useState<Workers | null>(null)

  useEffect(() => {
    const fetchWorkers = async () => {
      await fetch(
        'https://serverless-taskrouter-config-5449-dev.twil.io/fetch-workers'
      )
        .then(data => data.json())
        .then(res => setWorkers(res))
    }
    fetchWorkers()
  }, [])

  return (
    <>
      <Heading as='h1' variant='heading10'>
        Workers
      </Heading>
      <ButtonCreateWorker />
      <Table variant='borderless'>
        <THead>
          <Tr>
            <Th>Agent</Th>
            <Th>SID</Th>
            <Th textAlign='right'>Remove</Th>
          </Tr>
        </THead>
        <TBody>
          {workers?.workers.length ? (
            workers.workers.map(worker => (
              <Tr key={worker.sid}>
                <Th scope='row'>{worker.friendlyName}</Th>
                <Td>{worker.sid}</Td>
                <Td textAlign='right'>X</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Box width='600px'>
                <Stack orientation='vertical' spacing='space30'>
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                </Stack>
              </Box>
            </Tr>
          )}
        </TBody>
      </Table>
    </>
  )
}
