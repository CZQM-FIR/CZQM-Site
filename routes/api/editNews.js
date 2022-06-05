const { default: axios } = require("axios");
const { Router } = require("express");
const News = require('../../models/News');
const fs = require('fs');
const binary = require('mongodb').Binary
const path = require('path');

const multer = require('multer');
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];

    let origName = file.originalname.split(".")[0];
    cb(null, origName + '-' + Date.now()+ '.' +extension)
  }
})
let upload = multer({ storage: storage })

const router = Router();

router.post('/', upload.none(), async (req, res) => {
    let article;

    if (req.body._id) {
        article = await News.findOne({
            _id: req.body._id
        })
        article.name = req.body.name;
        article.text = req.body.text;
        article.date = new Date(req.body.date).getTime();
        await article.save()
        res
            .status(200)
            .json({
                message: 'Article Edited Successfully',
            })
    } else {
        article = await new News({
            name: req.body.name,
            text: req.body.text,
            date: new Date(req.body.date).getTime(),
        })
        await article.save()
        res
            .status(200)
            .json({
                message: 'Article Created Successfully',
            })
        console.log('saved')
    }
})
module.exports = router