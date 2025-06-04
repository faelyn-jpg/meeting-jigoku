import { Invitation, TimeSlot } from './invitation'
import invitations from './invitations.json'

function planMyDay(invitations: Array<Invitation>): Array<Invitation> {
  const idArray: Array<string> = []
  const confirmed = []
  function sortByDescending(a: Invitation, b: Invitation) {
    return b.duration - a.duration
  }
  const sorted = invitations.toSorted(sortByDescending)
  console.log(sorted)
  function conflictsWithAny(invitation: Invitation) {
    // console.log(invalidTimeslots.length + 'length')
    console.log(sorted.length)
    for (let i = 0; i < sorted.length; i++) {
      console.log("I'm trying!")
      const start = invitation.start
      const end = invitation.start + invitation.duration
      const confirmingStart = sorted[i].start
      const confirmingEnd = sorted[i].start + sorted[i].duration
      if (
        length < 1 ||
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
    return a.start, b.start
  }
  const schedule = confirmed.toSorted(byStartAscending)
  return schedule
}

console.log(planMyDay(invitations))
