import React from 'react'
import styled from 'styled-components'
import { AppointmentDetail } from '../Root'

const Wrapper = styled.div`
  background-color: #e7e7e7;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  padding: 24px 48px;
  box-shadow: 1px 1px 1px #b8b8b8;
  margin-bottom: 48px;
`

interface INavigationProps {
  selectedDetail: AppointmentDetail | null
}

const Navigation: React.FC<INavigationProps> = ({ selectedDetail }) => {
  const { appointment, broker } = selectedDetail || {}
  return (
    <Wrapper data-testid="navigation-appointment-detail">
      <strong>
        Currently selected appointment: {appointment ? `${appointment.date} with ${broker?.name}` : ''}
      </strong>
      <strong>Welcome to Lendi</strong>
    </Wrapper>
  )
}

export default Navigation
