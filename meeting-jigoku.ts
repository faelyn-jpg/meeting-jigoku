import { Invitation, TimeSlot } from './invitation'
import invitations from './invitations.json'
const { isRangeOverlap } = require('range-overlap')

function planMyDay(invitations: Array<Invitation>): Array<Invitation> {
  const idArray: Array<string> = []
  const confirmed: Array<Invitation> = []
  function sortByDescending(a: Invitation, b: Invitation) {
    return b.duration - a.duration
  }
  const sorted = invitations.toSorted(sortByDescending)

  function conflictsWithAny(invitation: Invitation) {
    for (let i = 0; i < confirmed.length; i++) {
      const start = invitation.start
      const end = invitation.start + invitation.duration
      if (confirmed.length < 1) {
        return true
      }
      const confirmedStart = confirmed[i].start
      const confirmedEnd = confirmed[i].start + confirmed[i].duration
      if (isRangeOverlap([start, end], [confirmedStart, confirmedEnd], true)) {
        return false
      }
    }

    return true
  }

  for (const unconfirmed of sorted) {
    if (conflictsWithAny(unconfirmed)) {
      confirmed.push(unconfirmed)
    }
  }

  function byStartAscending(a: Invitation, b: Invitation) {
    return a.start - b.start
  }
  const schedule = confirmed.toSorted(byStartAscending)

  var score = schedule.reduce(function (prev, cur) {
    return prev + cur.duration
  }, 0)

  console.log(schedule)
  console.log('score is ' + score)
  return schedule
}

planMyDay(invitations)
