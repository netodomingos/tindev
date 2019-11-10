const Dev = require('../models/Dev.js')

module.exports = {
    async store(request, response) {
        console.log(request.io, request.connectedUsers)
        const { devId } = request.params
        const { user } = request.headers

        const loggedDev = await Dev.findById(user)
        const targetDev = await Dev.findById(devId)

        if (!targetDev) {
            return response.status(400).json({ error: 'Dev not found' })
        }

        loggedDev.likes.push(targetDev._id)

        await loggedDev.save()

        console.log(`User ${loggedDev.user} liked ${targetDev.user}`)

        if (targetDev.likes.includes(loggedDev._id)) {
            const loggedSocket = request.connectedUsers[user]
            const targetSocket = request.connectedUsers[devId]

            if (loggedSocket) {
                request.io.to(loggedSocket).emit('match', targetDev)
            }
            if (targetDev) {
                request.io.to(targetSocket).emit('match', loggedDev)
            }
        }

        return response.json(loggedDev)
    }
}