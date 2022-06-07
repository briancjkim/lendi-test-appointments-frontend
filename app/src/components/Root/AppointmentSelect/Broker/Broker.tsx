import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { AppointmentDetail } from '../../Root'

const StyledListItem = styled.li`
  background-color: #f9e9e6;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`
const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-itmes: center;
`
const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

export interface BrokerProps {
  broker: {
    name: string
    id: number
    appointments: { id: number; brokerId: number; date: string }[]
  }
  setSelectedDetail: React.Dispatch<
    React.SetStateAction<AppointmentDetail | null>
  >
}

const Broker = ({ broker, setSelectedDetail }: BrokerProps) => {
  const [showAppointments, setShowAppointments] = useState(true)

  const handleAppointmentDateClick = useCallback(
    (appointment) => () => setSelectedDetail({ broker, appointment }),
    [setSelectedDetail, broker]
  )

  const toggleShowAppointment = useCallback(
    () => setShowAppointments(!showAppointments),
    [showAppointments, setShowAppointments]
  )

  return (
    <StyledListItem>
      <StyledContainer>
        {broker.name}
        <StyledButtonWrapper>
          <button
            data-testid={
              showAppointments
                ? 'broker-hide-appointments-button'
                : 'broker-show-appointments-button'
            }
            onClick={toggleShowAppointment}
          >
            {showAppointments ? 'Hide' : 'Show'}
          </button>
        </StyledButtonWrapper>
      </StyledContainer>
      {/* why use  ternary operator instead of &&*/}
      {showAppointments ? (
        <div
          style={{ display: 'flex', justifyContent: 'space-between' }}
          data-testid="broker-appointments-list"
        >
          appointments:
          <ul style={{ cursor: 'pointer' }}>
            {broker.appointments.length
              ? broker.appointments.map((appointment) => (
                  <li
                    key={appointment.id}
                    data-testid={`broker-appointments-list-item-${appointment.id}`}
                    onClick={handleAppointmentDateClick(appointment)}
                  >
                    {appointment.date}
                  </li>
                ))
              : null}
          </ul>
        </div>
      ) : null}
    </StyledListItem>
  )
}

export default Broker
