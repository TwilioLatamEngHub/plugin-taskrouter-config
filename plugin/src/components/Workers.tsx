import {
  Heading,
  SkeletonLoader,
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
        .catch(err => console.log(err))
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
            <Th>Roles</Th>
            <Th textAlign='right'>Remove</Th>
          </Tr>
        </THead>
        <TBody>
          {workers?.workers.length ? (
            workers.workers.map(worker => {
              const attributes = JSON.parse(worker.attributes)
              const { roles } = attributes
              return (
                <Tr key={worker.sid}>
                  <Th scope='row'>{attributes.full_name}</Th>
                  <Td>{worker.sid}</Td>
                  <Td>
                    {roles.length === 1
                      ? roles[0]
                      : roles.map((role: string) => `${role}, `)}
                  </Td>
                  <Td textAlign='right'>X</Td>
                </Tr>
              )
            })
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
