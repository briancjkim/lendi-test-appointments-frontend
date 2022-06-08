import React, { useState } from 'react'
import styled from 'styled-components'

import Navigation from './Navigation'
import AppointmentSelect from './AppointmentSelect'
import { Appointment, Broker } from './AppointmentSelect/AppointmentSelect'

const Wrapper = styled.div`
  background-color: #fcfcfc;
  height: 100%;
  width: 100%;
`

const Content = styled.div`
  margin: 0 auto;
  padding: 24px;
  width: 720px;
  box-shadow: 1px 1px 4px #d3d3d3;
  background-color: white;
  border-radius: 5px;
`

const Heading = styled.strong.attrs({ role: 'heading', level: 1 })`
  display: block;
  font-size: 36px;
  margin-bottom: 40px;
  margin-top: 20px;
`

export type AppointmentDetail = {
  appointment: Appointment
  broker: Broker
}

const Root = () => {
  const [selectedDetail, setSelectedDetail] =
    useState<AppointmentDetail | null>(null)

  return (
    <Wrapper>
      <Navigation selectedDetail={selectedDetail} />
      <Content>
        <Heading>Amazing site</Heading>
        <AppointmentSelect
          selectedDetail={selectedDetail}
          setSelectedDetail={setSelectedDetail}
        />
      </Content>
    </Wrapper>
  )
}

export default Root
