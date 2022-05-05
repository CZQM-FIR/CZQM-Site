const { default: axios } = require("axios");
const { Router } = require("express");
const Event = require('../../models/Event');
const multer  = require('multer')
const upload = multer({ dest: 'eventImages/' })
const fs = require('fs');
const binary = require('mongodb').Binary;

const router = Router();

router.post('/', upload.single('image'), async (req, res) => {
    let file = {name: req.body.name, file: binary(req.file.data)}

    let event;

    if (req.body._id) {
        event = await Event.findOne({
            _id: req.body._id
        })
        event.name = req.body.name;
        event.description = req.body.description;
        event.start = new Date(req.body.start).getTime();
        event.end = new Date(req.body.end).getTime();
        event.image = JSON.stringify(file);
    } else {
        event = await new Event({
            name: req.body.name,
            description: req.body.description,
            start: new Date(req.body.start).getTime(),
            end: new Date(req.body.end).getTime(),
            image: JSON.stringify(file)
        })
        await event.save()
        console.log('saved')
    }
})
module.exports = router