const { Router } = require('express')
const User = require('../../models/User')

const router = Router()

const letters = /^[A-Za-z]+$/

router.get('/:id', async (req, res) => {
  if (letters.test(req.params.id[0])) {
    const user = await User.findOne({ jwt: req.params.id })

    if (!user) return res.status(404).clearCookie('jwt', { path: '/' })
    if (!user) {
      return res.status(404).send('User not found')
    }

    user.save()

    return res.status(200).json({
      personal: user.personal,
      vatsim: user.vatsim,
      cid: user.cid,
      // role: user.role,
      flags: user.flags,
      bio: user.bio
    })
  }
  const user = await User.findOne({ cid: req.params.id })

  if (!user) return res.status(404).send('User not found')

  return res.status(200).json({
    cid: user.cid,
    personal: {
      name_first: user.personal.name_first,
      name_last: user.personal.name_last,
      name_full: user.personal.name_full
    },
    roster: user.roster,
    vatsim: user.vatsim,
    flags: user.flags,
    bio: user.bio
  })
})

router.all('/', async (req, res) => {
  const users = User.find()

  if (!users) return res.status(404)

  // eslint-disable-next-line prefer-const
  let usersReturn = [];

  (await users).forEach((user) => {
    usersReturn.push({
      cid: user.cid,
      personal: {
        name_first: user.personal.name_first,
        name_last: user.personal.name_last,
        name_full: user.personal.name_full
      },
      roster: user.roster,
      vatsim: user.vatsim,
      flags: user.flags,
      bio: user.bio
    })
  })

  return res.status(200).json({
    users: usersReturn.sort((a, b) => {
      const nameA = a.personal.name_last
      const nameB = b.personal.name_last

      if (nameA < nameB) {
        return -1
      }

      if (nameA > nameB) {
        return 1
      }

      return 0
    })
  })
})

module.exports = router
