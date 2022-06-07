import { Router } from 'express'
import moment from 'moment'

interface IAppointment {
  id: number
  brokerId: number
  date: string
}
const appointments = [
  { id: 1, brokerId: 1, date: '15/10/2021' },
  { id: 2, brokerId: 3, date: '22/11/2021' },
  { id: 3, brokerId: 3, date: '23/11/2021' },
  { id: 4, brokerId: 4, date: '10/5/2021' },
  { id: 5, brokerId: 3, date: '10/5/2022' },
]

const router = Router()

export default router

const sortByBrokerIdAscending = (items: IAppointment[]) => {
  return items.sort((a, b) => {
    if (a.brokerId > b.brokerId) {
      return 1
    } else if (a.brokerId < b.brokerId) {
      return -1
    } else {
      return 0
    }
  })
}
const sortByDateDescending = (items: IAppointment[]) => {
  return items.sort((a, b) => {
    const aTime = moment(a.date, 'DD/MM/YYYY')
    const bTime = moment(b.date, 'DD/MM/YYYY')
    if (aTime < bTime) {
      return 1
    } else if (aTime > bTime) {
      return -1
    } else {
      return 0
    }
  })
}
router.get('/', (req, res) => {
  //https://stackoverflow.com/questions/33299687/how-to-convert-dd-mm-yyyy-string-into-javascript-date-object
  let sortedAppointments = sortByDateDescending(appointments)
  sortedAppointments = sortByBrokerIdAscending(sortedAppointments)

  res.send(sortedAppointments)
})
