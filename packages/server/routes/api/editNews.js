const { default: axios } = require("axios");
const { Router } = require("express");
const path = require("path");

const multer = require("multer");

const News = require("../../models/News");

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
        "https://discord.com/api/webhooks/982999182711341176/ljflUw58vKKTCaH_IabGY4h0kq835zWfwvcnxN8cF8cfBYOOwoT9O6l-klo8YD3o2-pS?wait=true",
        {
          embeds: [
            {
              title: `${req.body.name}`,
              description: `${req.body.text.substring(
                0,
                50
              )}... [Read More](https://localhost:3000/news?_id=${
                article._id
              })`,
              timestamp: `${new Date(Date.now()).toISOString()}`,
              author: {
                name: "CZQM FIR News Feed",
                url: "https://czqm.ca/news",
              },
            },
          ],
        }
      );
    } catch (err) {
      console.error(err);
    }

    res.status(200).json({
      message: "Article Created Successfully",
    });
  }
});
module.exports = router;
