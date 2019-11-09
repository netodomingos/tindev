const express = require('express')
const DevController = require('./controllers/DevController.js')
const LikeController = require('./controllers/LikeController.js')
const DislikeController = require('./controllers/DislikeController.js')

const routes = express.Router()

routes.post('/dev', DevController.store)
routes.get('/dev', DevController.index)
routes.post('/dev/:devId/likes', LikeController.store)
routes.post('/dev/:devId/dislikes', DislikeController.store)

module.exports = routes