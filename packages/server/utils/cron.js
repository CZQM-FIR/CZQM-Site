/* eslint-disable no-param-reassign */
const cron = require('node-cron')
const axios = require('axios')
const User = require('../models/User')
const Event = require('../models/Event')

const getNextMonday = () => {
  const now = new Date()
  const today = new Date(now)
  today.setMilliseconds(0)
  today.setSeconds(0)
  today.setMinutes(0)
  today.setHours(0)

  const nextMonday = new Date(today)

  do {
    nextMonday.setDate(nextMonday.getDate() + 1) // Adding 1 day
  } while (nextMonday.getDay() !== 1)

  return nextMonday
}

const regsiterCron = async () => {
    cron.schedule('* * * * *', async () => {
        console.info('[INFO] Checking VATCAN')
        const roster = (await axios.get('https://vatcan.ca/api/v2/facility/roster', {
            headers: {
                'Authorization': `Token ${process.env.VATCAN_API_TOKEN}`
            }
        })).data.data
        const { controllers, visitors } = roster

        controllers.forEach(async controller => { 
            const { cid } = controller
            const user = await User.findOne({ cid })
            if (!user) {
                const newUser = new User({
                    cid,
                    flags: ['controller'],
                    personal: {
                        name_first: controller.first_name,
                        name_last: controller.last_name,
                        name_full: `${controller.first_name} ${controller.last_name}`,
                        email: controller.email,
                    },
                    vatsim: {
                        rating: {
                            id: controller.rating_id,
                            short: 'UNK',
                            long: 'Unknown',
                        },
                    }
                })
                await newUser.save()
            }
            else if (!user.flags.includes('controller')) {
                user.flags.push('controller')
                await user.save()
            }
        })

        visitors.forEach(async visitor => {
            const { cid } = visitor
            const user = await User.findOne({ cid })
            if (!user) {
                const newUser = new User({
                    cid,
                    flags: ['visitor'],
                    personal: {
                        name_first: visitor.first_name,
                        name_last: visitor.last_name,
                        name_full: `${visitor.first_name} ${visitor.last_name}`,
                        email: visitor.email,
                    },
                    vatsim: {
                        rating: {
                            id: visitor.rating_id,
                            short: 'UNK',
                            long: 'Unknown',
                        },
                    }
                })
                await newUser.save()
            }
            else if (!user.flags.includes('visitor')) {
                user.flags.push('visitor')
                await user.save()
            }
        })

        // const users = await User.find()

        // users.forEach(async user => { 
        //     const { cid } = user
        //     const isController = controllers.find(controller => controller.cid === cid)
        //     const isVisitor = visitors.find(visitor => visitor.cid === cid)
        //     if (!isController) {
        //         user.flags = user.flags.filter(flag => flag !== 'controller')
        //         await user.save()
        //     } else {
        //         user.flags.push('controller')
        //         await user.save()
        //     }
        //     if (!isVisitor) {
        //         user.flags = user.flags.filter(flag => flag !== 'visitor')
        //         await user.save()
        //     } else {
        //         user.flags.push('visitor')
        //         await user.save()
        //     }
        // })
    })

    cron.schedule('0 * * * *', async () => { 
        console.info('[INFO] Running Delete User Check')
        const users = await User.find()

        users.forEach(async user => { 
            if (user.flags.includes('delete')) {
                await user.remove()
            }
        })
    })

    cron.schedule('* * * * *', async () => {
        console.info('[INFO] Checking Name Capitalisation')
        const users = await User.find()

        users.forEach(async user => { 
            user.personal.name_first = user.personal.name_first.charAt(0).toUpperCase() + user.personal.name_first.slice(1)
            user.personal.name_last = user.personal.name_last.charAt(0).toUpperCase() + user.personal.name_last.slice(1)
            user.personal.name_full = `${user.personal.name_first} ${user.personal.name_last}`
            await user.save()
        })
    })

    cron.schedule('0 8 * * *', async () => {
        console.info('[INFO] Checking Moncton Monday')
        const events = await Event.find({
            name: 'Moncton Monday',
            end: { $gt: Date.now() },
        })
        if (events.length === 0) {
            console.info('[INFO] Adding Moncton Monday')
            const nextMonday = getNextMonday()
            const nextTuesday = new Date(nextMonday).setUTCDate(nextMonday.getUTCDate() + 1)
            const start = new Date(nextMonday).setUTCHours(23)
            const end = new Date(nextTuesday).setUTCHours(3)

            Event.create({
                name: 'Moncton Monday',
                image: 'MonctonMonday23.png',
                description: `Come out to Moncton Mondays where we have coverage of the Moncton and Gander FIR
                Pilots new to VATSIM are welcome!
                23h00z - 03h00z every Monday night!`,
                start,
                end,
            })
        }
    })
}

module.exports = regsiterCron