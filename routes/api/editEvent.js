const { default: axios } = require("axios");
const { Router } = require("express");
const Event = require('../../models/Event');
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

router.post('/', upload.single('image'), async (req, res) => {
    let event;

    if (req.body._id) {
        event = await Event.findOne({
            _id: req.body._id
        })
        event.name = req.body.name;
        event.description = req.body.description;
        event.start = new Date(req.body.start).getTime();
        event.end = new Date(req.body.end).getTime();
        event.image = req.file.filename;
        event.save()
        res
            .status(200)
            .json({
                message: 'Event Edited Successfully',
            })
    } else {
        event = await new Event({
            name: req.body.name,
            description: req.body.description,
            start: new Date(req.body.start).getTime(),
            end: new Date(req.body.end).getTime(),
            image: req.file.filename
        })
        await event.save()

        try {
            await axios.post('https://discord.com/api/webhooks/982999182711341176/ljflUw58vKKTCaH_IabGY4h0kq835zWfwvcnxN8cF8cfBYOOwoT9O6l-klo8YD3o2-pS?wait=true', {
            "embeds": [
		        {
		        	"title": `New Event: ${req.body.name}`,
		        	"description": `${req.body.description.substring(0, 50)}... [Read More](https://localhost:3000/events/${event._id})`,
		        	"timestamp": `${new Date(Date.now()).toISOString()}`,
		        	"author": {
		        		"name": "CZQM FIR Event Feed",
		        		"url": "https://czqm.ca/events"
		        	}
		        }
	        ]
            })
        } catch (err) {
            console.error(err);
        }

        res
            .status(200)
            .json({
                message: 'Event Created Successfully',
            })
        console.log('saved')
    }
})
module.exports = router