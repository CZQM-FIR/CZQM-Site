const { Router } = require('express')
const User = require('../../models/User')
const processFlag = require('../../utils/processFlag')

const router = Router()

router.get('/', async (req, res) => {
  // const user = await User.findOne({ jwt: req.cookies.jwt })

  // if (!user || user.role.id < 4) {
  //     return res.status(401).json({ msg: 'Not authorized' }).send()
  // }

  const userParam = JSON.parse(req.query.user)
  const flagParam = req.query.flag

  if (!userParam) {
    res.status(400).json({
      message: 'Unknown User'
    }).send()
  }

  try {
    const editUser = await User.findOne({ cid: userParam.cid })
    editUser.bio = userParam.bio || editUser.bio
    if (flagParam) {
      editUser.flags = processFlag(flagParam, editUser.flags)
    }

    await editUser.save()

    return res.status(200).send()
  } catch (error) {
    return res.status(500).json({
      error
    })
  }
})

module.exports = router
