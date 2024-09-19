const express = require('express')
const router = express.Router()

const subcriptionControllers = require('../../controllers/subcriptions/subcriptionControllers')
router.route('/').get(subcriptionControllers.getAll)

module.exports = router