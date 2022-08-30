import {
  Card,
  Heading,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr
} from '@twilio-paste/core'
import React from 'react'
import styled from 'styled-components'
import { ButtonCreateWorker } from './Buttons'

export const Workers = (): JSX.Element => {
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
          <Tr>
            <Th scope='row'>Adam Brown</Th>
            <Td>English, French, Sales, Spanish</Td>
            <Td textAlign='right'>X</Td>
          </Tr>
          <Tr>
            <Th scope='row'>Adriana Lovelock</Th>
            <Td>English, French, Sales, Spanish</Td>
            <Td textAlign='right'>X</Td>
          </Tr>
          <Tr>
            <Th scope='row'>Amanda Cutlack</Th>
            <Td>English, French, Sales, Spanish</Td>
            <Td textAlign='right'>X</Td>
          </Tr>
        </TBody>
      </Table>
    </>
  )
}
