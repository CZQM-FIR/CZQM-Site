const axios = require("axios");
const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const User = require('../../models/User')

const News = require("../../models/News");
const { sendEmailToAll } = require("../../utils/emailBroadcast");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename(req, file, cb) {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];

    const origName = file.originalname.split(".")[0];
    cb(null, `${origName}-${Date.now()}.${extension}`);
  },
});
const upload = multer({ storage });

const router = Router();

router.post("/", upload.none(), async (req, res) => {

    const user = await User.findOne({ jwt: req.cookies.jwt })

    if (!user || user.role.id < 4) {
        return res.status(401).json({ msg: 'Not authorized' })
    }

  let article;

  if (req.body._id) {
    article = await News.findOne({
      _id: req.body._id,
    });
    article.name = req.body.name;
    article.text = req.body.text;
    article.date = new Date(req.body.date).getTime();
    await article.save();
    res.status(200).json({
      message: "Article Edited Successfully",
    });
  } else {
    article = await new News({
      name: req.body.name,
      text: req.body.text,
      date: new Date(req.body.date).getTime(),
    });
    await article.save();

    try {
      await axios.post(
        process.env.DISCORD_WEBHOOK_URI,
        {
          embeds: [
            {
              title: `${req.body.name}`,
              description: `${req.body.text.substring(
                0,
                50
              )}... [Read More](https://134.122.37.1:3000/news?_id=${
                article._id
              })`,
              timestamp: `${new Date(Date.now()).toISOString()}`,
              author: {
                name: "CZQM FIR News Feed",
                url: "https://czqm.ca/news",
              },
            },
          ],
        }, {
          withCredentials: true
        }

        
      );

      // Send email to all users who have an email address and who are visitors or above
            const emailableUsers = await User.find({
                'personal.email': { $ne: null },
                'role.id': { $gte: 2 }
            })
            await sendEmailToAll([emailableUsers.map(userObject => userObject.personal.email)], `New Announcement: ${req.body.name}`, `
                <h1>New Announcement: ${req.body.name}</h1>
                <p>${req.body.text}</p>
                <p>Read More: <a href="https://134.122.37.1:3000/news?_id=${article._id}">Link</a></p>
            `,)
    } catch (err) {
      console.error(err);
    }

    res.status(200).json({
      message: "Article Created Successfully",
    });
  }
  return true
});
module.exports = router;
