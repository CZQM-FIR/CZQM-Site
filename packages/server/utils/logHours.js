const axios = require('axios')
const Session = require('../models/Session')

const callsigns = [
  "CZQM",
  "CZQX",
  "CYHZ",
  "CYYR",
  "CYZX",
  "CYYT",
  "CYQM",
  "CYFC",
  "CYZX",
  "LFVP",
  "CYSJ",
  "CYDF",
  "CYYG",
];

const logHours = async () => {
    const {controllers, ratings} = (await axios.get('https://data.vatsim.net/v3/vatsim-data.json')).data

    controllers.forEach(async controller => { 
        try {
            const { cid, callsign, frequency, name, rating } = controller
            const logonTime = new Date(controller.logon_time).valueOf()
            const lastUpdated = controller.last_updated
            // Check if controller is a czqm controller
            if (!callsigns.some(cs => cs === callsign.substring(0, 4))) return

            // Upsert the document
            const liveSession = await Session.findOneAndUpdate(
            { cid, logonTime },
            { cid, logonTime, callsign, frequency, duration: new Date(lastUpdated) - new Date(logonTime)},
            { upsert: true }
            )
            
            // If document was inserted rather than updated, send discord notif
            if (!liveSession) { 
                axios.post(process.env.ONLINE_DISCORD_WEBHOOK_URI, {
                    content: `📡 ${name} [${ratings.find(r => r.id === rating).short}] has logged into ${callsign} [${frequency}]`
                })
                console.info(`[INFO] New Controller Logon Recorded: ${name} (${ratings.find(r => r.id === rating).short}) ${callsign} (${frequency})`)
            }

        } catch (error) {
            console.error(error)
        }

    })

}

module.exports = logHours