import {
  screen,
  render,
  getByText,
  fireEvent,
  queryByText,
} from '@testing-library/react'
import Navigation from '../../Navigation'
import AppointmentSelect from '../AppointmentSelect'

import Broker from './Broker'

const testBroker = {
  name: 'bob',
  id: 1,
  appointments: [{ brokerId: 1, date: '24/11/2021', id: 1 }],
}

const selectedDetail = {
  broker: { id: testBroker.id, name: testBroker.name },
  appointment: testBroker.appointments[0],
}

//npx jest Broker
describe('Broker Component', () => {
  test('should hide and show appointments on button click', () => {
    const { getByTestId, queryByTestId } = render(
      <Broker broker={testBroker} setSelectedDetail={() => {}} />
    )

    const appointmentsList = getByTestId('broker-appointments-list')
    getByText(appointmentsList, '24/11/2021')

    const hideAppointmentsButton = getByTestId(
      'broker-hide-appointments-button'
    )
    fireEvent.click(hideAppointmentsButton)
    // not.toBeInTheDocument doesn't work => needs jest-dom package
    expect(queryByTestId('broker-appointments-list')).toBeNull()

    const showAppointmentsButton = getByTestId(
      'broker-show-appointments-button'
    )
    fireEvent.click(showAppointmentsButton)

    const reAppearedAppointmentsList = getByTestId('broker-appointments-list')
    queryByText(reAppearedAppointmentsList, '24/11/2021')
  })

  test('should trigger clickHandler on appointment date', () => {
    const setSelectedDetail = jest.fn()
    const { getByTestId } = render(
      <Broker broker={testBroker} setSelectedDetail={setSelectedDetail} />
    )
    const selectedAppointmentDate = getByTestId(
      `broker-appointments-list-item-${testBroker.appointments[0].id}`
    )
    fireEvent.click(selectedAppointmentDate)
    expect(setSelectedDetail).toBeCalled()
  })
})

describe('AppointmentSelect component', () => {
  test('should render appointment details text based on given prop', () => {
    const { getByTestId, getByText } = render(
      <AppointmentSelect
        selectedDetail={selectedDetail}
        setSelectedDetail={() => {}}
      />
    )
    getByTestId('appointment-detail-section')
    // The string is broken up by mutiple lines. so use exact:false text matcher option to match substring only
    // more control over fuzzy maching than exact:false. https://stackoverflow.com/questions/65796123/getbytext-doesnt-find-the-element
    // getByText('Appointment with Bob on 24/11/2021', {exact: false})
    getByText(new RegExp('Appointment with bob on 24/11/2021', 'i'))
  })
})

describe('Navigation component', () => {
  test('should render appointment details text based on given prop', () => {
    const { getByTestId, getByText } = render(
      <Navigation selectedDetail={selectedDetail} />
    )
    getByTestId('navigation-appointment-detail')
    getByText(
      new RegExp('Currently selected appointment: 24/11/2021 with Bob', 'i')
    )
  })
})
