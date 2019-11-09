const Dev = require('../models/Dev.js')

module.exports = {
    async store(request, response) {
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
            console.log(`${loggedDev.user} deu Match com ${targetDev.user}`)
        }

        return response.json(loggedDev)
    }
}