const { Router } = require("express");
const { readFileSync } = require('fs');
const { join } = require('path');
const filetype = import('file-type')

const router = Router();

router.get('/', async (req, res) => {
    res
        .status(404)
        .json({ message: 'A file ID must be specified' });
});

router.get('/:fileID', async (req, res) => {
    let file;

    try {
        file = readFileSync(join(__dirname, '../../uploads', req.params.fileID))

        res
            .status(200)
            .set('Content-Type', (await (await filetype).fileTypeFromBuffer(file)).mime)
            .send(file);
        
            console.log((await (await filetype).fileTypeFromBuffer(file)).mime)
    } catch (err) {
        res
            .status(404)
            .json({ message: 'File not found' });

        console.error(err);
    }
});

module.exports = router