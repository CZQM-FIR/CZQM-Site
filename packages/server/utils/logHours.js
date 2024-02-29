const axios = require('axios')
const Session = require('../models/Session')
const User = require('../models/User')

const callsigns = [
  'CZQM',
  'CZQX',
  'CYHZ',
  'CYYR',
  'CYZX',
  'CYYT',
  'CYQM',
  'CYFC',
  'CYZX',
  'LFVP',
  'CYSJ',
  'CYDF',
  'CYYG'
]

const unauth = (callsign, flags) => {
  switch (callsign.substring(5)) {
    case 'CTR':
      if (
        !flags.includes('roster-ctr-cert') &&
        !flags.includes('roster-ctr-solo') &&
        !flags.includes('roster-ctr-sup')
      ) {
        return true
      }
      break
    case 'APP':
      if (
        !flags.includes('roster-app-cert') &&
        !flags.includes('roster-app-solo') &&
        !flags.includes('roster-app-sup')
      ) {
        return true
      }
      break
    case 'DEP':
      if (
        !flags.includes('roster-app-cert') &&
        !flags.includes('roster-app-solo') &&
        !flags.includes('roster-app-sup')
      ) {
        return true
      }
      break
    case 'TWR':
      if (
        !flags.includes('roster-twr-cert') &&
        !flags.includes('roster-twr-solo') &&
        !flags.includes('roster-twr-sup')
      ) {
        return true
      }
      break
    case 'GND':
      if (
        !flags.includes('roster-gnd-cert') &&
        !flags.includes('roster-gnd-solo') &&
        !flags.includes('roster-gnd-sup')
      ) {
        return true
      }
      break
    case 'DEL':
      if (
        !flags.includes('roster-gnd-cert') &&
        !flags.includes('roster-gnd-solo') &&
        !flags.includes('roster-gnd-sup')
      ) {
        return true
      }
      break
  }
  return false
}

const logHours = async () => {
  const { controllers, ratings } = (
    await axios.get('https://data.vatsim.net/v3/vatsim-data.json')
  ).data

  if (!controllers) {
    return console.error('[ERROR] No controllers found in VATSIM data feed')
  }

  controllers.forEach(async (controller) => {
    try {
      const { cid, callsign, frequency, name, rating } = controller
      const logonTime = new Date(controller.logon_time).valueOf()
      const lastUpdated = controller.last_updated
      // Check if controller is a czqm controller
      if (!callsigns.some((cs) => cs === callsign.substring(0, 4))) return

      // Upsert the document
      const liveSession = await Session.findOneAndUpdate(
        { cid, logonTime },
        {
          cid,
          logonTime,
          callsign,
          frequency,
          duration: new Date(lastUpdated) - new Date(logonTime)
        },
        { upsert: true }
      )

      const user = await User.findOne({ cid })
      const { flags } = user

      // If document was inserted rather than updated, send discord notif
      if (!liveSession) {
        if (!user || !user.flags || unauth(callsign, flags)) {
          await axios.post(process.env.UNAUTHORIZED_DISCORD_WEBHOOK_URI, {
            content: `@everyone ⚠ 📡 **${name} (${cid}) [${
              ratings.find((r) => r.id === rating).short
            }] has logged into ${callsign} [${frequency}]** ⚠ \n\nThis user is not authorized to connect to this position according to their current roster status. Please check their current roster status [here](https://czqm.ca/portal/admin/users/${cid}) then contact a SUP.`
          })
          return
        }

        axios.post(process.env.ONLINE_DISCORD_WEBHOOK_URI, {
          content: `📡 ${name} [${
            ratings.find((r) => r.id === rating).short
          }] has logged into ${callsign} [${frequency}]`
        })
        console.info(
          `[INFO] New Controller Logon Recorded: ${name} (${
            ratings.find((r) => r.id === rating).short
          }) ${callsign} (${frequency})`
        )
      }
    } catch (error) {
      console.error(error)
    }
  })

  return [...(await Session.find())]
}

module.exports = logHours
