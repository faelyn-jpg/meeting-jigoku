import { Invitation, TimeSlot } from './invitation'
import invitations from './invitations.json'

function planMyDay(invitations: Array<Invitation>): Array<Invitation> {
  const idArray: Array<string> = []
  const confirmed = []
  function sortByDescending(a: Invitation, b: Invitation) {
    return b.duration - a.duration
  }
  const sorted = invitations.toSorted(sortByDescending)
  function conflictsWithAny(invitation: Invitation) {
    // console.log(invalidTimeslots.length + 'length')
    for (let i = 0; i < sorted.length; i++) {
      const start = invitation.start
      const end = invitation.start + invitation.duration
      const confirmingStart = sorted[i].start
      const confirmingEnd = sorted[i].start + sorted[i].duration
      if (
        (start >= confirmingStart && start <= confirmingEnd) ||
        (end >= confirmingStart && end <= confirmingEnd)
      ) {
        // return false
        break
      }
      return false
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
  console.log(score)
  console.log(schedule)
  return schedule
}

planMyDay(invitations)
