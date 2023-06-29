const getRosterStatus = (flags) => {
  const rosterStatus = {}

  switch (flags.find((flag) => flag.startsWith('roster-gnd'))) {
    case 'roster-gnd-sup':
      rosterStatus.gnd = -2
      break
    case 'roster-gnd-cert':
      rosterStatus.gnd = 1
      break

    default:
      rosterStatus.gnd = -1
      break
  }

  switch (flags.find((flag) => flag.startsWith('roster-twr'))) {
    case 'roster-twr-sup':
      rosterStatus.twr = -2
      break
    case 'roster-twr-solo':
      rosterStatus.twr = 0
      break
    case 'roster-twr-cert':
      rosterStatus.twr = 1
      break

    default:
      rosterStatus.twr = -1
      break
  }

  switch (flags.find((flag) => flag.startsWith('roster-app'))) {
    case 'roster-app-sup':
      rosterStatus.app = -2
      break
    case 'roster-app-solo':
      rosterStatus.app = 0
      break
    case 'roster-app-cert':
      rosterStatus.app = 1
      break

    default:
      rosterStatus.app = -1
      break
  }

  switch (flags.find((flag) => flag.startsWith('roster-ctr'))) {
    case 'roster-ctr-sup':
      rosterStatus.ctr = -2
      break
    case 'roster-ctr-solo':
      rosterStatus.ctr = 0
      break
    case 'roster-ctr-cert':
      rosterStatus.ctr = 1
      break

    default:
      rosterStatus.ctr = -1
      break
  }

  if (flags.find((flag) => flag === 'fss')) {
    rosterStatus.fss = 1
  } else {
    rosterStatus.fss = -1
  }

  return rosterStatus
}

module.exports = getRosterStatus
