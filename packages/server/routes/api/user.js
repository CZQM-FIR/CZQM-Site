const { Router } = require('express')
const User = require('../../models/User')

const router = Router()

/**
 * Returns the proper role name for the user
 * @param {User} user A user from the mongo database
 * @returns The new name of the role
 */
const fixRoleName = (user) => {
    let roleName = ''

    switch (user.role.id) {
        case 0:
            if (user.role.name !== 'Guest') {
                roleName = 'Guest'
                user.save()
            }
            break

        case 1:
            if (user.role.name !== 'Visiting Controller') {
                roleName = 'Visiting Controller'
                user.save()
            }
            break

        case 2:
            if (user.role.name !== 'Home Controller') {
                roleName = 'Home Controller'
                user.save()
            }
            break

        case 3:
            if (user.role.name !== 'Mentor') {
                roleName = 'Mentor'
                user.save()
            }
            break

        case 4:
            if (user.role.name !== 'Instructor') {
                roleName = 'Instructor'
                user.save()
            }
            break

        case 5:
            if (user.role.name !== 'Events') {
                roleName = 'Events'
                user.save()
            }
            break
        
        case 6:
            if (user.role.name !== 'Sector Engineer') {
                roleName = 'Sector Engineer'
                user.save()
            }
            break

        case 7:
            if (user.role.name !== 'Chief Instructor') {
                roleName = 'Chief Instructor'
                user.save()
            }
            break
        
        case 8:
            if (user.role.name !== 'Deputy Chief') {
                roleName = 'Deputy Chief'
                user.save()
            }
            break
        
        case 9:
            if (user.role.name !== 'Webmaster') {
                roleName = 'Webmaster'
                user.save()
            }
            break
        
        case 10:
            if (user.role.name !== 'FIR Chief') {
                roleName = 'FIR Chief'
                user.save()
            }
            break
        
        default:
            //     user.role.id = 0
            //     user.role.name = 'Guest'
            //     user.save()
            break
    }

    return roleName
}

router.get('/:jwt', async (req, res) => {
    const user = await User.findOne({ jwt: req.params.jwt })

    if (!user) return res.status(404).clearCookie('jwt')

    if (!user.role.id || user.role.id === 0) {
        user.role.name = 'Guest'
    } else {
        user.role.name = fixRoleName(user)
    }

    if (!user) {
        return res.status(404).send('User not found')
    }

    return res.status(200).json({
        personal: user.personal,
        vatsim: user.vatsim,
        cid: user.cid,
        role: user.role,
    })
})

router.all('/', async (req, res) => {
    const users = User.find()

    if (!users) return res.status(404)

    // eslint-disable-next-line prefer-const
    let usersReturn = []

    ;(await users).forEach((user) => {
        usersReturn.push({
            cid: user.cid,
            personal: user.personal,
            role: user.role,
            roster: user.roster,
            vatsim: user.vatsim,
        })
    })

    return res.status(200).json({
        users: usersReturn,
    })
})

module.exports = router
