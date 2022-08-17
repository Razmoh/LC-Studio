const fs = require('fs').promises;
const path = require('path');
const express = require('express');
var router = express.Router()

//SUPPRIMER LES IMAGES EN LIEN SUIVANT L'ID
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const filepath = path.resolve(`public/images/${id}/image1.jpg`)
        await fs.unlink(filepath);
        const filepath2 = path.resolve(`public/images/${id}/image2.jpg`)
        await fs.unlink(filepath2)
       return res.status(200).json('OK')
    } catch (err) {
        next(err);
    }
})



module.exports = router;