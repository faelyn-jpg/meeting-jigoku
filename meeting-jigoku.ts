import { Invitation, TimeSlot } from './invitation.ts'
import invitations from './invitations.json'

function planMyDay(invitations: Array<Invitation>): Array<string> {
  const idArray: Array<string> = []
  const invalidTimeslots: Array<TimeSlot> = []
  let lastInvite: Invitation | null = null
  let biggestInvite: Invitation | null = null

  function setInvitesToNull() {
    biggestInvite = null
    lastInvite = null
  }

  function addInvalidTime(invite: Invitation) {
    invalidTimeslots.push({
      start: invite.start,
      end: invite.start + invite.duration,
    })
  }
  function validTime(invite: Invitation, length: number) {
    const start = invite.start
    const end = invite.start + invite.duration
    // console.log(invalidTimeslots.length + 'length')

    for (let i = 0; i <= length; i++) {
      console.log("I'm trying!")
      if (
        length < 1 ||
        (start >= invalidTimeslots[i].start &&
          start <= invalidTimeslots[i].end) ||
        (end >= invalidTimeslots[i].start && end <= invalidTimeslots[i].end)
      ) {
        // return false
        break
      }
      console.log('false')
      console.log(start)
      console.log(invalidTimeslots[i])
      return false
    }
    console.log('true')
    return true
  }

  function largestTimeslot() {
    setInvitesToNull()
    console.log('length is ' + invalidTimeslots.length)
    invitations.forEach((invite) => {
      //conditions:
      //biggest timeslot, doesn't clash with any other timeslots
      if (
        lastInvite === null ||
        (biggestInvite !== null && invite.duration > biggestInvite.duration)
      ) {
        if (validTime(invite, invalidTimeslots.length)) {
          biggestInvite = invite
        }
      }

      lastInvite = invite
    })
    // console.log(biggestInvite)
    if (biggestInvite !== null) {
      //push timeslot to array of unavailable timeslots
      idArray.push(biggestInvite.id)
      addInvalidTime(biggestInvite)
    }
    return biggestInvite
    //if there is an id, push id to id array
  }
  largestTimeslot()
  largestTimeslot()
  console.log(invalidTimeslots)
  return idArray
}

console.log(planMyDay(invitations))
