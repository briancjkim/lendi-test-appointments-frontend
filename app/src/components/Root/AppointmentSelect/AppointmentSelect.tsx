import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AppointmentDetail } from '../Root'

import Broker from './Broker'

const Wrapper = styled.div`
  display: flex;
  gap: 100px;
`

const SideBar = styled.div`
  width: 250px;
`

const Heading = styled.strong.attrs({ role: 'heading', level: 2 })`
  display: block;
  font-size: 20px;
`

type BrokerAppointments = {
  id: number
  name: string
  appointments: { id: number; brokerId: number; date: string }[]
}[]

export type Broker = {
  id: number
  name: string
}

export type Appointment = {
  id: number
  brokerId: number
  date: string
}

interface IAppointmentSelectProps {
  selectedDetail: AppointmentDetail | null
  setSelectedDetail: React.Dispatch<
    React.SetStateAction<AppointmentDetail | null>
  >
}

const AppointmentSelect: React.FC<IAppointmentSelectProps> = ({
  selectedDetail,
  setSelectedDetail,
}) => {
  const [brokerAppointments, setBrokerAppointments] =
    useState<BrokerAppointments>([])

  // why batch the request in single useEffect?
  useEffect(() => {
    const fetchData = async () => {
      const { data: brokers }: { data: Broker[] } = await axios.get(
        'http://localhost:8080/brokers'
      )
      const { data: appointments }: { data: Appointment[] } = await axios.get(
        'http://localhost:8080/appointments'
      )

      const brokerAppointments = brokers.map((broker) => {
        const appointmentsBelongsToCurrentBroker = appointments.filter(
          (appointment) => appointment.brokerId === broker.id
        )
        return {
          ...broker,
          appointments: appointmentsBelongsToCurrentBroker,
        }
      })

      setBrokerAppointments(brokerAppointments)
    }
    fetchData()
  }, [])

  return (
    <Wrapper>
      <SideBar>
        <Heading>Amazing site</Heading>
        <ul>
          {brokerAppointments.map((broker) => (
            <Broker
              key={broker.id}
              broker={broker}
              setSelectedDetail={setSelectedDetail}
            />
          ))}
        </ul>
      </SideBar>
      <div data-testid="appointment-detail-section">
        <Heading>Appointment details</Heading>
        {selectedDetail ? (
          <div>
            Appointment with {selectedDetail.broker.name} on{' '}
            {selectedDetail.appointment.date}
          </div>
        ) : null}
      </div>
    </Wrapper>
  )
}

export default AppointmentSelect
