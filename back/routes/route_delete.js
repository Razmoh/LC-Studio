const fs = require('fs').promises;
const path = require('path');
const express = require('express');
var router = express.Router()


router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const filepath = path.resolve(`public/images/${id}/image.jpg`)
        await fs.unlink(filepath);
       return res.status(200).json('OK')
    } catch (err) {
        next(err);
    }
})



module.exports = router;